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

def dhome(request):
	    return render(request, "dhome.html", {})