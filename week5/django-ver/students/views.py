from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from .models import Student

# Create your views here.

def get_number_students_in_dorm(request: HttpRequest) -> HttpResponse:
    if request.method == 'GET':
        dorm = request.GET.get('dormName', '')
        print(dorm)
        # LSPs don't like this, but it does work
        # (see https://docs.djangoproject.com/en/5.1/topics/db/models/#model-attributes)
        # this is because django uses metaclasses, which often messes
        # with lsp type systems
        students = Student.objects.filter(dorm=dorm)
        count = len(students)
        return JsonResponse(data={'count': count})
    return HttpResponse(status=400)


