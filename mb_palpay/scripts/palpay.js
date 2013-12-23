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
                var unFormatedAmount =$accountInfo.ammount;
                var formatedAmount=numeral(unFormatedAmount).format('0,0.0');
                
                transactions.push("<tr><td>" + $accountInfo.date + "</td><td>"
                               + explanation_Cap_first + "</td><td>"
                               +formatedAmount+ "</td></tr>"
              
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
               +"<td><strong>"+availableBalanceFormated+" "+cur+"</strong></td><td><strong>"+
               currentBalanceFormated +" "+cur+"</strong></td></tr>"
              
              
               );       
           });
           
       });
       
    
    //////////////////////////////////////////////////////////////////////////////
    
    
    //
    //
    //
    ///////////////////////////////////////////

    $.getJSON("data/newCustomerData.json", function( data ) {
           
           var bankAccounts=[];
                 
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
            
               
               var curBalance=$accountInfo.currentBalance;
               var avaBalance=$accountInfo.availableBalance;
               
               
               var currentBalanceFormated = numeral(curBalance).format('0,0.00');
               var availableBalanceFormated = numeral(avaBalance).format('0,0.00');
               
               
           //    console.log(iban_en);
             //  bankAccounts.push("<li><a data-icon='details' id='"+$accountInfo.accountNumber+"'+ href='#moreAccountInfo'><strong>"+$accountInfo.accountNumber+"</strong></a></li>");
              
               bankAccounts.push("<li class='accountInfo'><a data-icon='details' id='"+$accountInfo.accountNumber+"'+ href='#moreAccountInfo'>"+"<strong>"+type_Cap_first+"</strong>"+"<br>"+$accountInfo.accountNumber+"<br><strong>Balance :</strong>"+$accountInfo.currentBalance+"</a></li>");
               //<a data-icon="play" href="#moreAccountInfo">Pay a friend</a>
                     
           });
               console.log(bankAccounts);
              
        $('#balanceInquiryTable').html(bankAccounts);

      });
       
    //////////////////////////////////////////
    //
    //
    //
        
    
   
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
  
    
    
    /* function LogInClicked() { 
     var test =$("#userName").value;
         console.log(test);
         
         
     }
    */
    
   // document.getElementById("login").onclick = LogInClicked;
    
    
    
    
    
     $(this).click(function(event) {
         var curAccount =event.target.id;
      //  console.log(curAccount);
          $.getJSON("data/newCustomerData.json", function( data ) {
           
           var moreAccountInfo=[];
                 
           $.each(data.accounts,function(key,val){
               var $accountInfo = $(this).get(0);     
            //   console.log($accountInfo);
            if($accountInfo.accountNumber===curAccount){
                console.log("acct num"+$accountInfo.accountNumber);
                console.log("cur acct"+curAccount);
                
               console.log("in loop"); 
                //add content here 
               moreAccountInfo.push("<li><strong>Account Number: </strong><br>"+$accountInfo.accountNumber+"</li>"+
                                    "<li><strong>IBAN_BBAN :</strong>"+$accountInfo.IBAN_BBAN+"</li>"+
                                    "<li><strong>Type: </strong>"+$accountInfo.type+"</li>"+
                                    "<li><strong>Available Balance :</strong>"+$accountInfo.availableBalance+"</li>"+
                                    "<li><strong>Current Balance : </strong>"+$accountInfo.currentBalance+"</li>"+
                                    "<li><strong>Currancy :</strong>"+$accountInfo.currency+"</li>");
                $("#moreInfoDiv").html(moreAccountInfo);
                
            }
             
                     
           });
              // console.log(bankAccounts);
              
        //$('#balanceInquiryTable').html(bankAccounts);

      });
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
    });
    
    
    
    
    //queryend
    
    
    
    
    
})




