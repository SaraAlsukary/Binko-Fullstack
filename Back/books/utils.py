from django.db.models import Count
from .models import Like, Book ,Book_Category
from readbooks.models import BookRead
from django.db.models import Count, Case, When

def recommend_books_simple(user_id, limit=10):
    # 1. جلب الكتب التي أعجب بها المستخدم
    user_likes = Like.objects.filter(user_id=user_id).values_list('book_id', flat=True)

    # 2. جلب المستخدمين الآخرين الذين أعجبوا بنفس الكتب
    similar_users = Like.objects.filter(book_id__in=user_likes).exclude(user_id=user_id).values_list('user_id', flat=True)

    # 3. جلب الكتب التي أعجب بها هؤلاء المستخدمون
    recommended_books = (
        Like.objects.filter(user_id__in=similar_users)
        .exclude(book_id__in=user_likes)  # استبعاد الكتب التي أعجب بها المستخدم
        .values('book_id')
        .annotate(like_count=Count('book_id'))
        .order_by('-like_count')[:limit*2]  # نزيد قليلاً لنعوض عن الكتب المستبعدة لاحقاً
    )

    # 4. استبعاد الكتب التي قرأها المستخدم
    read_books = BookRead.objects.filter(user_id=user_id).values_list('book_id', flat=True)

    # 5. استخراج الكتب التي لم يقرأها
    book_ids = [item['book_id'] for item in recommended_books if item['book_id'] not in read_books]

    # 6. إرجاع القائمة النهائية بالحد المطلوب
    return Book.objects.filter(id__in=book_ids)[:limit]



def recommend_books_same_categories(book_id, limit=5):
    # 1) فئات الكتاب الحالي عبر الجدول الوسيط
    cats = (
        Book_Category.objects
        .filter(book_id=book_id)
        .values_list('category_id', flat=True)
    )
    if not cats:
        return Book.objects.none()

    # 2) ابحث عن كتب أخرى ضمن نفس الفئات واحسب عدد الفئات المشتركة (shared)
    candidates = (
        Book_Category.objects
        .filter(category_id__in=list(cats))
        .exclude(book_id=book_id)
        .values('book_id')
        .annotate(shared=Count('category_id', distinct=True))
        .order_by('-shared')[:limit]
    )

    # 3) اجلب كائنات الكتب مع الحفاظ على ترتيب الأفضلية
    book_ids = [row['book_id'] for row in candidates]
    if not book_ids:
        return Book.objects.none()

    preserved_order = Case(*[When(id=pk, then=pos) for pos, pk in enumerate(book_ids)])
    return (
        Book.objects
        .filter(id__in=book_ids, is_accept=True)   # ✅ شرط is_accept
        .order_by(preserved_order)
    )