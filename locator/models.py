from django.contrib.gis.db import models

# Create your models here.

class APDMP_Districts(models.Model):
    district = models.CharField(max_length=254)
    state_ut = models.CharField(max_length=254)
    
    geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.district


class APDMP_Mandals(models.Model):
    sub_distri = models.CharField(max_length=254)
    district = models.CharField(max_length=254)
    state_ut = models.CharField(max_length=254)
    assignment = models.CharField(max_length=25)
    lfa = models.CharField(max_length=25)
    fa = models.CharField(max_length=25)
    sno = models.IntegerField()

    geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.sub_distri

class APDMP_Villages(models.Model):
    village_id = models.CharField(max_length=254)
    name = models.CharField(max_length=254)
    sub_distri = models.CharField(max_length=254)
    district = models.CharField(max_length=254)
    state_ut = models.CharField(max_length=254)
    c_code01 = models.CharField(max_length=254)
    lfa = models.CharField(max_length=80)
    fa = models.CharField(max_length=80)
    gp = models.CharField(max_length=80)
    hi_depth = models.IntegerField()
    pumpdepth = models.IntegerField()
    
    geom = models.MultiPolygonField(srid=4326)

    def __str__(self):
        return self.name

class AP_Districts(models.Model):
    country = models.CharField(max_length=75)
    state = models.CharField(max_length=75)
    district = models.CharField(max_length=75)
    geom = models.MultiPolygonField(srid=4326)
    
    def __str__(self):
        return self.district