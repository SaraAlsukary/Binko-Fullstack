from rest_framework import serializers
from .models import Book_Fav ,Book , Book_Category ,Like
from account.models import CustomUser
from chapters.models import Chapter
from categories.models import Category 


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name','name_arabic']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name']  

class BooksSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    categories = serializers.SerializerMethodField() 

    class Meta:
        model = Book
        fields = ['id', 'name', 'image', 'description', 'publication_date', 'user', 'categories','is_accept','content']

    def get_categories(self, obj):

        return [book_category.category.name for book_category in Book_Category.objects.filter(book=obj)]


class FavoriteBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book_Fav
        fields = ['user', 'book']        

class BookFavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book_Fav
        fields = ['id', 'user', 'book']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BookCatSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ['id', 'name', 'user','categories' , 'image' ,'description' ,'content']

    def get_categories(self, obj):
        categories = Category.objects.filter(bookcategory__book=obj)
        return CategorySerializer(categories, many=True).data      




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'username', 'image']

class BookDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer()  

    class Meta:
        model = Book
        fields = [ 'name', 'user','publication_date' ,'image' ,'user','content']    


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'

#add book
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id']

class BookCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()  
    class Meta:
        model = Book_Category
        fields = ['category']

class AddBookSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, source="categories"
    )
    book_categories = BookCategorySerializer(source='bookcategory_set', many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'user', 'name', 'content','image', 'description', 'publication_date', 'category_id', 'book_categories']

    def create(self, validated_data):
        categories = validated_data.pop('categories')  
        user = validated_data.pop('user')  
        book = Book.objects.create(user=user, **validated_data)  

        for category in categories:
            Book_Category.objects.create(book=book, category=category)

        return book
    
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'book']



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'note']



class BookLikesSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'name','image','description', 'likes_count'] 
    def get_likes_count(self, obj):
        return Like.objects.filter(book=obj).count()    


class LikeStatusSerializer(serializers.Serializer):
    is_liked = serializers.BooleanField()

class BookLikeSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'name', 'image', 'description', 'publication_date', 'is_liked','content']

    def get_is_liked(self, obj):
        user_id = self.context['user_id']  
        return Like.objects.filter(user_id=user_id, book=obj).exists()    
    

#اضافة حسب اسم الفئة
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BookCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()  
    class Meta:
        model = Book_Category
        fields = ['category']

class AddBookCatSerializer(serializers.ModelSerializer):
    category_names = serializers.ListField(
        child=serializers.CharField(), write_only=True
    )
    book_categories = BookCategorySerializer(source='bookcategory_set', many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'user', 'name', 'image', 'description', 'publication_date', 'category_names', 'book_categories','content']

    def create(self, validated_data):
        category_names = validated_data.pop('category_names')  
        user = validated_data.pop('user')  
        book = Book.objects.create(user=user, **validated_data)  

        for name in category_names:
            category, created = Category.objects.get_or_create(name=name)
            Book_Category.objects.create(book=book, category=category)

        return book
    

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['title', 'content_text', 'audio', 'note']

class BookUpdateSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True)
    categories = serializers.ListField(child=serializers.CharField(), write_only=True)  # ← استلام أسماء الفئات

    class Meta:
        model = Book
        fields = ['name', 'image', 'description', 'publication_date', 'content', 'categories', 'chapters']

    def update(self, instance, validated_data):
        
        instance.name = validated_data.get('name', instance.name)
        instance.image = validated_data.get('image', instance.image)
        instance.description = validated_data.get('description', instance.description)
        instance.publication_date = validated_data.get('publication_date', instance.publication_date)
        instance.content = validated_data.get('content', instance.content)
        instance.is_accept = False  
        instance.save()

        
        Book_Category.objects.filter(book=instance).delete()
        category_names = validated_data.get('categories', [])
        for name in category_names:
            category, _ = Category.objects.get_or_create(name=name)
            Book_Category.objects.create(book=instance, category=category)

   
        Chapter.objects.filter(book=instance).delete()

        
        chapters_data = validated_data.get('chapters', [])
        for chapter_data in chapters_data:
            Chapter.objects.create(
                book=instance,
                title=chapter_data['title'],
                content_text=chapter_data['content_text'],
                audio=chapter_data.get('audio'),
                note=chapter_data.get('note'),
                is_accept=False
            )

        return instance    