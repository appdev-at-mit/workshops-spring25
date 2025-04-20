from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from .models import Student
import json

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
    
    # WEEK 6: POST endpoint
    if request.method == 'POST':
        try:
            # Get data from request
            data = json.loads(request.body)
            name = data.get('name', '')
            dorm = data.get('dormName', '')
            
            # Check data is valid
            if not name or not dorm:
                return JsonResponse(
                    data={'error': 'Both name and dorm are required'},
                    status=400
                )
            
            # Create and save the new student
            student = Student(name=name, dorm=dorm)
            student.save()
            
            return JsonResponse(
                data={'messsage': 'Success!'},
                status=200
            )
        except Exception as e:
            return JsonResponse(
                data={'error': str(e)},
                status=500
            )
    return HttpResponse(status=400)

