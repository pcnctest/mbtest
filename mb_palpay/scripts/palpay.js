$(document).ready(function() {
    console.log("ready!");
    
    var accountBalance = {
        "Balnces":[
            {"0450/0375056/001/3000/000":"Iyad & Galina US$ account"},
            {"0450/0375056/029/3000/000":"Iyad & Galina JOD  account"},
            {"0450/0375056/033/3000/000":"Iyad & Galina EUR account"},
            {"0450/0375056/099/3000/000":"Iyad & Galina ILS account"}
        ]
    };
    
    var accountBalance2 = {
        "Balances":[
            {"id":["0450/0375056/001/3000/000","Iyad & Galina US$ account"]},
            {"id":["0450/0375056/029/3000/000","Iyad & Galina JOD  account"]},
            {"id":["0450/0375056/033/3000/000","Iyad & Galina EUR account"]},
            {"id":["0450/0375056/099/3000/000","Iyad & Galina ILS account"]}
        ]
    };
    
    
    
    var accountsData={
        "Accounts":[
        {"accountNumber":""},
        {"name":""},
        {"balance":""},
        {"currancy":""},
        {"type":""},
        {"ibanNumber":""},
        {"bbanNumber":""},
        
        ]};
    
    
    //////////////////// get trans actions start ////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
        $.getJSON("data/transactions.json", function(data) {
            var transactions = [];
           
            $.each(data.transactions, function(key, val) {
                var $accountInfo = $(this).get(0);     
             var explanation_toLower=($accountInfo.explanation).toLowerCase();
             var explanation_Cap_first=  explanation_toLower.substr(0,1).toUpperCase()+explanation_toLower.substr(1); 
             //   console.log(explanation_Cap_first);
            //    console.log($accountInfo);
                transactions.push("<tr><td>" + $accountInfo.date + "</td><td>"
                               + explanation_Cap_first + "</td><td>"
                               + $accountInfo.ammount + "</td></tr>"
              
                );       
            });
          //  console.log(transactions);

            $('#transactionsTableBody').html(transactions);
        });
        
       
         
    //////////////////// get trans actions end ////////////////////////////////////
    
    
      /* $.getJSON("data/customerData.json", function( data ) {
           
           var customers=[];
           var i=1;
                   
           $.each(data.accounts,function(key,val){
               var $accountInfo = $(this).get(0);     
             //  customers.push("<td>");
            //   console.log($accountInfo);
               customers.push("<tr><td>"+$accountInfo.accountNumber+"</td><td>"
               +$accountInfo.name+"</td><td>"
               +$accountInfo.balance+"</td><td>"
               +$accountInfo.currancy+"</td><td>"
               +$accountInfo.type+"</td><td>"
               +$accountInfo.ibanNumber+"</td><td>"
               +$accountInfo.bbanNumber+"</td></tr>"
               );       
           });
             //  console.log(data);
              

           $('#tableBody').html(customers);
           
        
       });
       */
       
    
   /* var string = numeral(1000).format('0,0');
    console.log(string);
    */
    
    
    
    
    /////////////////// new Customer Data function ///////////////////////////////
    
     $.getJSON("data/newCustomerData.json", function( data ) {
           
           var customers=[];
           
                   
           $.each(data.accounts,function(key,val){
               var $accountInfo = $(this).get(0);     
             //  console.log($accountInfo);
               var iban_st=$accountInfo.IBAN_BBAN.substring(0,9);
               var iban_en=$accountInfo.IBAN_BBAN.substring(9);
               
               
               var type_toLower=($accountInfo.type).toLowerCase();
               var len=type_toLower.length;
               var cur=($accountInfo.type).substr(len-4);
             //  console.log(cur);
               var type_Cap_first=type_toLower.substr(0,1).toUpperCase()+type_toLower.substr(1,len-4)+cur;
               var type_Cap_first=type_toLower.substr(0,1).toUpperCase()+type_toLower.substr(1,len-4)+cur;
               
               var curBalance=$accountInfo.currentBalance;
               var avaBalance=$accountInfo.availableBalance;
               
               
               var currentBalanceFormated = numeral(curBalance).format('0,0.00');
               var availableBalanceFormated = numeral(avaBalance).format('0,0.00');
               
               
           //    console.log(iban_en);
               customers.push("<tr><td>"+$accountInfo.accountNumber+"</td><td>"+iban_st+"<br>"+iban_en+"</td><td>"
               +type_Cap_first+"</td>"
               +"<td><strong>"+availableBalanceFormated+" "+cur+"</strong></td><td><strong>"+currentBalanceFormated +" "+cur+"</strong></td></tr>"
              
              
               );       
           });
             //  console.log(data);
              

           $('#tableBody').html(customers);
           
        
       });
       
    
    //////////////////////////////////////////////////////////////////////////////
    
    
   
    var listItems = "";
    for (var i = 0; i < accountBalance2.Balances.length; i++) {
      //  console.log(accountBalance2.Balances[i].id[1]);
        listItems+= "<option> " + accountBalance2.Balances[i].id[1] + "</option>";
    }
    $("#accountsList").html(listItems);
    
    
    //var title=app.view().id;
    
    
    //$("#viewTitle").html(title);
    
    
    var blancesListContainer ="<ul data-role='listview' data-style='inset'>";
    
    for (var i=0;i<accountBalance2.Balances.length;i++){
        
        blancesListContainer+= "<li><a data-icon='action' href='#'>"+accountBalance2.Balances[i].id[1]+"</a></li>";
  //  console.log("<li><a data-icon='action' href='#'>"+accountBalance2.Balances[i].id[1]+"</a></li>");    
    }
    blancesListContainer+="</ul>";
  //  $(blancesList).html(blancesListContainer);
 
    
    
    /////////////////////// get the current date //////////////////////
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
       
  //  console.log(today);
    $(currentDate).html(today);
    //queryend
})




