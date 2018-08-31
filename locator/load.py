import os
from django.contrib.gis.utils import LayerMapping
from .models import APDMP_Districts, APDMP_Mandals, APDMP_Villages, AP_Districts

apdmp_district_mapping = {
    'district' : 'DISTRICT',
    'state_ut' : 'STATE_UT',
    'geom' : 'MULTIPOLYGON',
}

apdmp_mandals_mapping = {
    'sub_distri': 'SUB_DISTRI',
    'district': 'DISTRICT',
    'state_ut': 'STATE_UT',
    'assignment': 'Assignment',
    'lfa': 'LFA',
    'fa': 'FA',
    'sno': 'S.No.',
    'geom': 'MULTIPOLYGON',
}

apdmp_villages_mapping = {
    'village_id': 'village_id',
    'name': 'name',
    'sub_distri': 'sub_distri',
    'district': 'district',
    'state_ut': 'state_ut',
    'c_code01': 'c_code01',
    'lfa': 'LFA',
    'fa': 'FA',
    'gp': 'GP',
    'hi_depth': 'hi-depth',
    'pumpdepth': 'pumpDepth',
    'geom': 'MULTIPOLYGON',
}

ap_districts_mapping = {
    'country': 'Country',
    'state': 'State',
    'district': 'District',
    'geom': 'MULTIPOLYGON',
}


apdmp_districts_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 
                    'files', 'APDMP_Districts.shp'))

apdmp_mandals_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 
                    'files', 'APDMP_Mandals.shp'))      

apdmp_villages_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 
                    'files', 'APDMP_Villages.shp'))

ap_districts_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 
                    'files', 'AP_Districts.shp'))

def run(verbose=False):
    lm = LayerMapping(APDMP_Districts, apdmp_districts_shp, apdmp_district_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)
    
    lm = LayerMapping(APDMP_Mandals, apdmp_mandals_shp, apdmp_mandals_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)
    
    lm = LayerMapping(APDMP_Villages, apdmp_villages_shp, apdmp_villages_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)

    lm = LayerMapping(AP_Districts, ap_districts_shp, ap_districts_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)


def delete_questionable():
    to_del = APDMP_Villages.objects.filter(sub_distri='Atmakur').delete()

def clean():
    APDMP_Districts.objects.all().delete()
    APDMP_Mandals.objects.all().delete()
    APDMP_Villages.objects.all().delete()
    AP_Districts.objects.all().delete()