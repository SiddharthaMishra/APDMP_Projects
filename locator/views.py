from django.shortcuts import render
from django.views.generic import TemplateView
from .models import APDMP_Districts, APDMP_Mandals, APDMP_Villages, AP_Districts
from django.core.serializers import serialize
import json

# Create your views here.

class IndexView(TemplateView):
    template_name = 'locator/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['apdmp_districts'] = APDMP_Districts.objects.all()
        context['apdmp_mandals'] = APDMP_Mandals.objects.all()
        context['apdmp_villages'] = APDMP_Villages.objects.all()
        context['ap_districts'] = AP_Districts.objects.all()
        return context

def index(request):
    data = {}
    data['apdmp_mandals'] = APDMP_Mandals.objects.all()
    data['apdmp_villages'] = APDMP_Villages.objects.all()
    data['ap_districts'] = AP_Districts.objects.all()
    
    for key, value in data.items():
        data[key] = serialize('geojson', value, geometry_field="geom")
    
    to_send = json.dumps(data)

    return render(request, "locator/index.html", {
        'json_string': to_send,
        'apdmp_mandals': APDMP_Mandals.objects.all(),
        'apdmp_villages': APDMP_Villages.objects.all(),
        'apdmp_districts': APDMP_Districts.objects.all(),
        })
