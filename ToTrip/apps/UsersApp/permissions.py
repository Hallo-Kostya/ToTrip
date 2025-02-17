from rest_framework import permissions

class IsModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser and request.user.is_staff)
    
class OwnerOrModeratorOrReadonly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.is_superuser or request.user.is_staff:
            return True
        return obj.author == request.user
    