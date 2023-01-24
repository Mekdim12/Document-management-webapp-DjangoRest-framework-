from django.shortcuts import render,redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import  PdfInformation
from django.db.models import Q
from .serializer import PdfSerializers
# Create your views here.
'''
    url/pdf post for insert
    url/pdf/id Put for update
    url/pdf/id delete for deleteing
    url/pdf get for reading 
'''

#  so use class base api view

class PdfManipulation(APIView):

    def get(self, request):
        pdfObject = PdfInformation.objects.all()
        serialized = PdfSerializers(pdfObject, many=True)
        return Response(serialized.data)

       
    def post(self, request):
        
        
        dataFeteched = request.data
        
        pdfTittle = dataFeteched.get('tittle')
        pdfDescription = dataFeteched.get('description')
        pdfCatagory = dataFeteched.get('catagory')
        pdfFile  = dataFeteched.get('pdfFile')

        
        pdfObjectToSave = PdfInformation( 
                tittle = pdfTittle,
                description = pdfDescription,
                catagory = pdfCatagory,
                pdf = pdfFile
        )       
        
        try:
            pdfObjectToSave.save()
            return Response('successfully added')
        except  Exception as e:
            return Response(":( sad but not saved")

        
class pdfManipulation_(APIView):
    def get_object(self, seachParam):
        
        pdfObject = None
        try:
            id_ = int(seachParam) # it it pass this test then it might be the id of the index for seaching used
            pdfObject = PdfInformation.objects.get(id = id_)

        except:
            # some searching parameter is used that is not something parsable to integer datatype
            pdfObject = PdfInformation.objects.get(Q(tittle= seachParam) | Q(catagory= seachParam))
        return pdfObject

    def get(self, request, seachParam):
        pdfObject = self.get_object(seachParam)
        serialized = PdfSerializers(pdfObject, many=False)
        return Response(serialized.data)
        
        
    def delete(self, request,seachParam):
        pdfObject = self.get_object(seachParam)
        try:

            pdfObject.delete()
            return Response('--- sucessfully deleted')

        except:
            return redirect('--- not successfully deleted ---')

       
        

    def put(self, request,seachParam):
        dataFeteched = request.data
        
        pdfTittle = dataFeteched.get('tittle')
        pdfDescription = dataFeteched.get('description')
        pdfCatagory = dataFeteched.get('catagory')
        pdfFile  = dataFeteched.get('pdfFile')

        pdfObject = self.get_object(seachParam)
        
    
        pdfObject.tittle = pdfTittle
        pdfObject.description = pdfDescription,
        pdfObject.description = pdfObject.description[0] 
        pdfObject.catagory = pdfCatagory
        pdfObject.pdf = pdfFile

        
        
        try:
            pdfObject.save()
            return Response('--- Sucessfully Updated ---')
        except Exception as e:
            
            return Response('--- :( sad but not update ---')


        
        

