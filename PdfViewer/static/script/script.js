const baseUrl = window.location.href



let data2 = [];
let flag = false;
let pageDetectorForModalTraversing = false;
let counterFlag = 0;
let modalBodyWithInserItem = document.querySelector(".modalBody_1");
let modalBodyWithDisplayItem = document.querySelector(".modalBody_2");
let modalBodywithUpdatingItem = document.querySelector(".modalBody_3");
let modalItemFounder = document.querySelector(".modalAdditemButton");
let backToPreviousPageModal = document.querySelector(".modalBackButton");
let deleteItemInModal = document.querySelector(".DeleteItemInModal");
var managePdfModalOpener = document.querySelector("#managePdfModalOpener");
let pdfTittle = document.querySelector(".pdfTittleEdit");
let pdfCatagory = document.querySelector(".pdfCatagoryEdit");
let pdfDescription = document.querySelector(".pdfDescriptionEdit");
let saveBtnForAdding = document.querySelector('.savebtnmodal')
let previousSize_of_sidebar = document.querySelector(".sideBarContainer").computedStyleMap().get("width")["value"];
let previousSize_of_rightpanel = document.querySelector(".rightPanelCardConatainer").computedStyleMap().get("width")["value"];
var modalCloseBtn = document.querySelector(".modalCloseButton");
let rightPanelCardHolder = document.querySelector(".rightPanelCardConatainer");
let editItemInModal = document.querySelectorAll(".EditIteminModal");


fetch(baseUrl+"pdf-view/")
  .then((data) => {
    return data.json();
  })
  .then(function (json) {
    data2 = json;
  });



mainBodyDataItemFiller();
addPdfItemInformation();




rightPanelCardHolder.addEventListener("scroll", () => {
  rightPanelCardHolder.onscroll = function (evt) {
    if (rightPanelCardHolder.scrollTop + 1 + window.innerHeight > 1450) {
      document.querySelector(".sideBarContainer").style.display = "none";
      rightPanelCardHolder.setAttribute("style", "width:100% !important");
      document.querySelector(".floatingButtonForTabeOfContetn").style.display =
        "inline-block";
    } else {
      if (!flag) {
        document.querySelector(".sideBarContainer").style.display =
          "inline-block";
        document
          .querySelector(".sideBarContainer")
          .setAttribute(
            "style",
            "width:" + previousSize_of_sidebar + "% !important"
          );
        rightPanelCardHolder.setAttribute(
          "style",
          "width:" + previousSize_of_rightpanel + "% !important"
        );
        document.querySelector(
          ".floatingButtonForTabeOfContetn"
        ).style.display = "none";
      }
    }
  };
});


document.querySelector(".sidebarCloser").addEventListener("click", () => {
  flag = true;
  document
    .querySelector(".sideBarContainer")
    .setAttribute("style", "display:none !important");

  rightPanelCardHolder.setAttribute("style", "width:100% !important");

  document.querySelector(".floatingButtonForTabeOfContetn").style.display =
    "inline-block";
});


document.querySelector(".sideBarOpener").addEventListener("click", () => {
  document.querySelector(".sideBarContainer").style.display = "inline-block";

  document
    .querySelector(".sideBarContainer")
    .setAttribute("style", "width:" + previousSize_of_sidebar + "% !important");
  rightPanelCardHolder.setAttribute(
    "style",
    "width:" + previousSize_of_rightpanel + "% !important"
  );

  flag = false;
  document.querySelector(".floatingButtonForTabeOfContetn").style.display =
    "none";
});


modalCloseBtn.addEventListener("click", () => {
  document
    .querySelector(".modalContainer")
    .classList.add("displayManagerOfModal");
});

managePdfModalOpener.addEventListener("click", () => {
  document
    .querySelector(".modalContainer")
    .classList.remove("displayManagerOfModal");
  BackButtonAndModalOpenberFunctionalyty();
  pageDetectorForModalTraversing = false;
});

modalItemFounder.addEventListener("click", () => {
  modalBodyWithDisplayItem.classList.add("modalToggler");
  modalBodyWithInserItem.classList.remove("modalToggler");
  modalItemFounder.style.display = "none";
  backToPreviousPageModal.style.display = "inline-block";
  pageDetectorForModalTraversing = false;
});

backToPreviousPageModal.addEventListener("click", () => {
  if (pageDetectorForModalTraversing) {
    BackButtonAndModalTogglerFunctionality();
  } else {
    BackButtonAndModalOpenberFunctionalyty();
  }
});

document.querySelector(".Updatebtnmodal").addEventListener("click", () => {
  updatePdfInformation_second();
});

saveBtnForAdding.addEventListener('click',()=>{
  pdfItemAddingToTheList()
})

function allAvailabelListOfTittles() {
  fetch(baseUrl+"pdf-view/")
    .then((data) => {
      return data.json();
    })

    .then((complatedata) => {
      let content = "";
      complatedata.map((values) => {
        content +=
          "<div class='sideBarListItem sideBarContainerCardHover' style='padding-bottom:8px;padding-top:18px'> <h5 class='sidebarcardTittle'> Tittle:" +
          values.tittle +
          " </h5>  <h6> Catogry: "+ values.catagory+"</h6></div>";
      });

      document.querySelector(".scrollbar").innerHTML = content;
    })
    .catch((err) => {
      //   console.log(err);
    });
}

function TittleSearch() {
  let dataSearched = "";
  var searchField = document.querySelector("#idsearchingTermOfSideBar").value.trim().toLowerCase()
  
  let srchVal = data2.filter((val) =>
    val.tittle.toLowerCase().includes(searchField)
  );
  
  if (srchVal.length == 0) {
    dataSearched =
      "<div class='sideBarListItem sideBarContainerCardHover' style='padding-bottom:8px;padding-top:18px'> <h5 style='color:red'> No Matching Item Found</h5>  </div>";
  } else {
    srchVal.forEach((values) => {
      dataSearched +=
        "<div class='sideBarListItem sideBarContainerCardHover' style='padding-bottom:8px;padding-top:18px'> <h5> Tittle:" +
        values.tittle +
        " </h5>  <h6> Catogry: "+values.catagory+"</h6></div>";
    });
  }

  document.querySelector(".scrollbar").innerHTML = "";
  document.querySelector(".scrollbar").innerHTML = dataSearched;
}

function searchValue() {
  let srchString = "";
  let cardBodyMain2 = "";
  var searchField = document
    .getElementById("searchright")
    .value.trim()
    .toLowerCase();
    
  let srchVal = data2.filter((val) =>
    val.tittle.toLowerCase().includes(searchField)
  );

  if (srchVal.length == 0) {
    let body = `<div style="width:100%; height:70vh; display:flex; justify-content:center; align-items:center; margin-bottom:25px; background-color: rgba(245, 245, 245, 0.827);"><img src="https://img.icons8.com/stickers/40/000000/nothing-found.png"/>`;

    srchString =
      `<h1"> The File` + searchField + `<em > Is Not found!</em> </h1>`;

    cardBodyMain2 = body + srchString + "</div>";


    cardBodyMain2 =
      `<div style="width:100%; height:70vh; display:flex; justify-content:center; align-items:center; margin-bottom:25px; background-color: rgba(245, 245, 245, 0.827);"><h1 style="color:dodgerblue;"><img src="https://img.icons8.com/stickers/60/000000/nothing-found.png"/> The File <q>` +
      searchField +
      `</q><em> Is Not found!</em> </h1> </div>`;

  } else {
    srchVal.forEach((values) => {
      cardBodyMain2 +=
        `<a  href="/client/src/pages/pdfViewer.html?pdf=` +
        values.path +
        `"> <div class="cardContainer">
          <div class="cardHeader">
              <h3>` +
        values.tittle +
        `</h3>
          </div>
          <div class="cardPdfHolder">
            <object class="pdfHolderObject" data="` +
        values.pdf +
        `" width="320" height="120"
            style="overflow:hidden; width: 320px; height: 120px"></object>
          </div>
          <div class="cardBodyHolder">

            <div class="CatagoryHolder">
                <h5>Catagory : `+values.catagory+`</h5>
            </div>

            <div class="descriptionHolder">
              <p class="carDescription"> ` +
        values.description +
        `</p>
            </div>
          </div>

        </div> </a>`;
    });
  }
  document.getElementById("searchright").innerHTML = "";
  document.querySelector(".grid-container").innerHTML = cardBodyMain2;
}

function BackButtonAndModalOpenberFunctionalyty() {
  modalBodyWithDisplayItem.classList.remove("modalToggler");
  modalBodyWithInserItem.classList.add("modalToggler");

  modalBodyWithDisplayItem.classList.remove("modalToggler_2");
  modalBodywithUpdatingItem.classList.add("modalToggler_2");

  modalItemFounder.style.display = "block";
  backToPreviousPageModal.style.display = "none";
}

function BackButtonAndModalTogglerFunctionality() {
  modalBodyWithDisplayItem.classList.remove("modalToggler");
  modalBodyWithInserItem.classList.add("modalToggler");

  modalBodywithUpdatingItem.classList.add("modalToggler_2");

  modalItemFounder.style.display = "block";
  backToPreviousPageModal.style.display = "none";
}

function addPdfItemInformation() {
  fetch(baseUrl+"pdf-view")
    .then((response) => response.json())
    .then((datas) => {
      var bodyModalItem = "";

      for (let index in datas) {
        bodyModalItem +=
          `<div class="cardBodymodalHolder">
              <div class="modalItemContextHolder">
                  <div class="tittleHoldermadal"><strong>Tittle:</strong>` +
          datas[index].tittle +
          ` </div>
              <div class="catagoryHoldermodal"><strong>Catagory:</strong>` +
          datas[index].catagory +
          `</div>
              <div class="idOfAnItemmodaDisplayed" style="display:none">` +
          index +
          `</div>
            </div>
            <div class="CardBodyModalFunctionalityButtonHolder">
                <div class="editButtonHolderModal">
                    <button class="EditIteminModal"  > <img src="https://img.icons8.com/material-outlined/24/null/pencil--v2.png"/></button>
                </div>
                <div class="DeleteButtonHolderModal">
                    <button class="DeleteItemInModal"><img src="https://img.icons8.com/material-rounded/24/null/delete-forever.png"/></button>
                </div>
            </div> 
        </div>`;
      }
      document.querySelector(".modalBody_2").innerHTML = "";
      document.querySelector(".modalBody_2").innerHTML = bodyModalItem;
      bodyModalItem = "";

      EditpdfItemInformationPageModalOpenderandEventAdder(datas);
      modalDeleteButtonEventListenerAdder(datas);
    });
}

function EditpdfItemInformationPageModalOpenderandEventAdder(datas) {
  
  document.querySelectorAll(".EditIteminModal").forEach((item, index) => {
    item.addEventListener("click", (evt) => {
      modalBodyWithDisplayItem.classList.add("modalToggler");
      modalBodywithUpdatingItem.classList.remove("modalToggler_2");
      modalItemFounder.style.display = "none";
      backToPreviousPageModal.style.display = "inline-block";
      pageDetectorForModalTraversing = true;
      var actualDataChoosenToBeEdittoPreDisplay = datas[index];

      pdfTittle.placeholder =
        actualDataChoosenToBeEdittoPreDisplay.tittle.trim();
      pdfCatagory.placeholder =
        actualDataChoosenToBeEdittoPreDisplay.catagory.trim();
      pdfDescription.placeholder =
        actualDataChoosenToBeEdittoPreDisplay.description.trim();
    
      });
  });

}

//  so far the simplest one u came up with:- for  the  solution for updating using fetch and http of put 
// take advantage of FormData class look up on mdn
function updatePdfInformation_second(){
  let formObject = document.querySelector('#updatingInformation')
  const formData = new FormData(formObject)
  let pdfTittleforUpdate = document.querySelector(".pdfTittleEdit").placeholder;
  let csrfs = document.querySelectorAll('input[name=csrfmiddlewaretoken]');
    
  fetch(baseUrl+"pdf-view/"+pdfTittleforUpdate.trim(),{
    'method':'PUT',
    headers :{
      "X-CSRFToken":csrfs[1].value,
    },
     body:formData
  }).then((resp)=>resp.json()).then((result)=>{

      document.querySelector('.visibiltyHanderofthesecondModal').style.display = "block"
      document.querySelector('#fortoggleingtheSecondmodalitemUpdate').style.display = "flex"
      document.querySelector('#fortoggleingtheSecondmodalitemUpdate').classList.add('forUpdatedText')
      addPdfItemInformation()
      mainBodyDataItemFiller();
      backToPreviousPageModal.click()
      sleep(3000).then(()=>{
        document.querySelector('.visibiltyHanderofthesecondModal').style.display = "none"
        document.querySelector('#fortoggleingtheSecondmodalitemUpdate').style.display = "none"
        document.querySelector('#fortoggleingtheSecondmodalitemUpdate').classList.remove('forUpdatedText') 
      });
     
      
  }).catch((err)=>{
    console.log(err)
  })


}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function modalDeleteButtonEventListenerAdder(itemContent){

  let deleteButtons = document.querySelectorAll('.DeleteItemInModal');

  deleteButtons.forEach((deleteitem, index)=>{
      deleteitem.addEventListener('click',()=>{
        deletingAnItem(itemContent[index].id)
      })
  })

}

function deletingAnItem(idOfAnItemvToBeDeleted){


  const csrfs = document.querySelectorAll('input[name=csrfmiddlewaretoken]');
  
  fetch(baseUrl+"pdf-view/"+idOfAnItemvToBeDeleted,{
    method:'DELETE',
    headers :{
      "X-CSRFToken":csrfs[1].value,
    },
  }).then((response)=>response.json()).then((result)=>{

    document.querySelector('.visibiltyHanderofthesecondModal').style.display = "block"
    document.querySelector('#fortoggleingtheSecondmodalitemDelete').style.display = "flex"
    document.querySelector('#fortoggleingtheSecondmodalitemDelete').classList.add('fordeletedText')
    addPdfItemInformation()
    mainBodyDataItemFiller();
    sleep(3000).then(()=>{
      document.querySelector('.visibiltyHanderofthesecondModal').style.display = "none"
      document.querySelector('#fortoggleingtheSecondmodalitemDelete').style.display = "none"
      document.querySelector('#fortoggleingtheSecondmodalitemDelete').classList.remove('fordeletedText') 
    });


  }).catch((err)=>{
      
  })

}

function pdfItemAddingToTheList(){

  const formobj = document.querySelector('#addingAnItem')
  let addingFormData = new FormData(formobj)
  let csrfs = document.querySelectorAll('input[name=csrfmiddlewaretoken]');
  
  fetch(baseUrl+'pdf-view/',{
    'method':'POST',
    headers :{
      "X-CSRFToken":csrfs[0].value,
    },
    body:addingFormData
  }).then((resp)=>resp.json()).then((actualResp)=>{
    document.querySelector('.visibiltyHanderofthesecondModal').style.display = "block"
      document.querySelector('#fortoggleingtheSecondmodalitemAdded').style.display = "flex"
      document.querySelector('#fortoggleingtheSecondmodalitemAdded').classList.add('forUpdatedText')
      addPdfItemInformation();
      mainBodyDataItemFiller();
      backToPreviousPageModal.click()
      sleep(3000).then(()=>{
        document.querySelector('.visibiltyHanderofthesecondModal').style.display = "none"
        document.querySelector('#fortoggleingtheSecondmodalitemAdded').style.display = "none"
        document.querySelector('#fortoggleingtheSecondmodalitemAdded').classList.remove('forUpdatedText') 
      });

  }).catch((err)=>{
    console.log("-- error in Post--")
  })
  

  
}
  
function mainBodyDataItemFiller(){
  let cardBodyHolder_ = ``;
  fetch(baseUrl+"pdf-view/")
  .then((data) => {
        return data.json();
      })
      .then((values)=>{
        values.forEach((val, index)=>{
          
          cardBodyHolder_ +=

          `<a href="`+baseUrl+`main-pdfview/`+val.id+`">
          <div class="cardContainer">
               <div class="cardHeader">
                   <h3>` +
                   val.tittle +
                  `</h3>
               </div>
           <div class="cardPdfHolder">
             <object class="pdfHolderObject"  data="`+val.pdf+`" width="320" height="120"
             style="overflow:hidden; width: 320px; height: 120px"></object>
           </div>
   
           <div class="cardBodyHolder">
               <div class="CatagoryHolder">
                   <h5>Catagory :`+val.catagory+`</h5>
               </div>
               <div class="descriptionHolder">
                 <p class="carDescription"> ` +
                 val.description +
                 `</p>
               </div>
           </div>
   
         </div> </a>`;
        })
        
        document.getElementById("columns").innerHTML = "";
        document.getElementById("columns").innerHTML = cardBodyHolder_;
        allAvailabelListOfTittles();
      
      }).catch((errr)=>{
          console.log(errr)
      });

    

      

     
}