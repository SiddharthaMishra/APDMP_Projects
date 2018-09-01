from django.shortcuts import render
from django.http import HttpResponse
from .models import APDMP_Districts, APDMP_Mandals, APDMP_Villages, AP_Districts
from django.core.serializers import serialize
import json



# Create your views here.

def index(request):
	lfa = {}
	districts = {}

	villages = APDMP_Villages.objects.all()

	for village in villages:
		if village.lfa not in lfa:
			lfa[village.lfa] = [village.fa]
		
		if village.fa not in lfa[village.lfa]:
			lfa[village.lfa].append(village.fa)
		
		if village.district in districts:
			if village.sub_distri in districts[village.district]:
				districts[village.district][village.sub_distri].append(village.name)
			else:
				districts[village.district][village.sub_distri] = [village.name]
		else:
			districts[village.district] = {village.sub_distri:[village.name]} 
	
	to_send = {
		"districts" : districts,
		"lfa": lfa,
	}

	json.dumps(to_send)

	return render(request, "locator/index.html", {"to_send": to_send})
			
def get_geom(request):

    request_type = request.POST['type']
    if request_type == '0':
        obj = APDMP_Mandals
    else:
        obj = APDMP_Villages

    if request.POST['fa']:
        areas = obj.objects.filter(fa=request.POST['fa'])    
    else:
        areas = obj.objects.filter(lfa=request.POST['lfa'])
    
    if request_type != '0' and request.POST['village']:
        areas = areas.filter(name=request.POST['village'])
    elif request.POST['mandal']:
        areas = areas.filter(sub_distri=request.POST['mandal'])
    elif request.POST['district']:
        areas = areas.filter(district=request.POST['district'])

    if areas:
        to_send = serialize('geojson', areas, geometry_field='geom')
        return HttpResponse(to_send, content_type="application/json")
    else:
        return HttpResponse("")

def get_border(request):
    to_send = serialize('geojson', AP_Districts.objects.all(), geometry_field='geom')
    return HttpResponse(to_send, content_type="application/json")

    