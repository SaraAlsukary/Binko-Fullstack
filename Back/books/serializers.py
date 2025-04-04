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
        fields = ['id', 'name', 'image', 'description', 'publication_date', 'user', 'categories','is_accept']

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
        fields = ['id', 'name', 'user','categories' , 'image' ,'description' ]

    def get_categories(self, obj):
        categories = Category.objects.filter(bookcategory__book=obj)
        return CategorySerializer(categories, many=True).data      




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'username', 'image']

class BookDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # تضمين بيانات المستخدم الذي أضاف الكتاب

    class Meta:
        model = Book
        fields = [ 'name', 'user','publication_date' ,'image' ,'user']    


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
        fields = ['id', 'user', 'name', 'image', 'description', 'publication_date', 'category_id', 'book_categories']

    def create(self, validated_data):
        categories = validated_data.pop('categories')  # استخراج قائمة الفئات
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