from django.shortcuts import render
from .models import projectlist

# Create your views here.
def home(request):
	    return render(request, "index.html", {})

def idea(request):
	    return render(request, "idea.html", {})

def idea2(request):
	    
	    queryset = projectlist.objects.all()
	    context = {
			"queryset": queryset
		}

	    return render(request, "idea2.html", context)

def demo(request):
	    return render(request, "demo.html", {})

def dsales(request):
	    return render(request, "dsales.html", {})

def dtop(request):
	    return render(request, "dtop.html", {})

def dret(request):
	    return render(request, "dret.html", {})

def dguided(request):
	    return render(request, "dguided.html", {})