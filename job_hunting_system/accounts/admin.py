# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class UserAdmin(UserAdmin ):

    list_display = ('username', 'email', 'user_type', 'is_staff')

    fieldsets = UserAdmin .fieldsets + (
        ('Additional Info', {'fields': ('nickname', 'user_type', 'profile_image')}),
    )
    
    add_fieldsets = UserAdmin .add_fieldsets + (
        ('Additional Info', {'fields': ('nickname', 'email', 'user_type', 'profile_image')}),
    )

admin.site.register(User, UserAdmin)
