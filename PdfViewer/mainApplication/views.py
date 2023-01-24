from django.shortcuts import render,redirect
from pdfApi.models import  PdfInformation

# Create your views here.
def HomePage(request):
    return render(request, 'index.html')

def pdfViewPage(request,id):
    try:
        currenSelectedPdfItemObject = PdfInformation.objects.get(id = id)
        context = {
            "pdf":currenSelectedPdfItemObject.pdf,
            "tittle":currenSelectedPdfItemObject.tittle
        }
        return render(request, 'pdfView.html',context)
    except:
        return redirect('/')

    

    