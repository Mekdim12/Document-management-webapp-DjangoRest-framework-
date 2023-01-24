from django.db import models

# Create your models here.


class PdfInformation(models.Model):
    
    tittle = models.CharField(unique=True, editable= True,null=False, blank=False,max_length=54, db_column="PdfTittle")
    description = models.CharField(db_column='PdfDescription',editable=True,max_length=250)
    catagory = models.CharField(db_column='pdfCatagory', editable=True, max_length=25,default='NOT-APPLICABLE')
    pdf   = models.FileField(upload_to='Files/',db_column="PDF" ,null=True,blank=True)
    
    class Meta:
        db_table = 'PdfInformation'
    
    def __str__(self):
        return self.tittle

        
        