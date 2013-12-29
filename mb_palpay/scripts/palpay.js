



$(document).ready(function() {
    console.log("ready!");
    
    
    //////// test MVVM ////////////
    
   
       
       
    
  
    
    
    
    
    
    
    
    
    
    
    
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
    var accountsData = {
        "Accounts":[
            {"accountNumber":""},
            {"name":""},
            {"balance":""},
            {"currancy":""},
            {"type":""},
            {"ibanNumber":""},
            {"bbanNumber":""},
        
        ]
    };
    
    // get the data from transactions.json and fill transactionsTableBody in the Mini statement view //
    //////////////////// Mini-Statement get trans actions start (ACTIVE)////////////////////////////////////
    $.getJSON("data/transactions.json", function(data) {
        var transactions = [];
           
        $.each(data.transactions, function(key, val) {
            var $accountInfo = $(this).get(0);     
            var explanation_toLower = ($accountInfo.explanation).toLowerCase();
            var explanation_Cap_first = explanation_toLower.substr(0, 1).toUpperCase() + explanation_toLower.substr(1); 
         
            var unFormatedAmount = $accountInfo.ammount;
            var formatedAmount = numeral(unFormatedAmount).format('0,0.0');
                
            transactions.push("<tr><td>" + $accountInfo.date + "</td><td>"
                              + explanation_Cap_first + "</td><td>"
                              + formatedAmount + "</td></tr>"
              
            );       
        });

        $('#transactionsTableBody').html(transactions);
    });
    //////////////////// get trans actions end ////////////////////////////////////
  
    /////////////////// Balance Iquiry main table fill (ACTIVE) ///////////////////
    $.getJSON("data/newCustomerData.json", function(data) {
        var customers = [];
           
        $.each(data.accounts, function(key, val) {
            var $accountInfo = $(this).get(0);     
            var iban_st = $accountInfo.IBAN_BBAN.substring(0, 9);
            var iban_en = $accountInfo.IBAN_BBAN.substring(9);
            var type_toLower = ($accountInfo.type).toLowerCase();
            var len = type_toLower.length;
            var cur = ($accountInfo.type).substr(len - 4);
            var type_Cap_first = type_toLower.substr(0, 1).toUpperCase() + type_toLower.substr(1, len - 4) + cur;
            var type_Cap_first = type_toLower.substr(0, 1).toUpperCase() + type_toLower.substr(1, len - 4) + cur;
            var curBalance = $accountInfo.currentBalance;
            var avaBalance = $accountInfo.availableBalance;
            var currentBalanceFormated = numeral(curBalance).format('0,0.00');
            var availableBalanceFormated = numeral(avaBalance).format('0,0.00');
               
            customers.push("<tr><td>" + $accountInfo.accountNumber + "</td><td>" + iban_st + "<br>" + iban_en + "</td><td>"
                           + type_Cap_first + "</td>"
                           + "<td><em>" + currentBalanceFormated + " " + cur + "</em></td><td><em>" +
                           availableBalanceFormated + " " + cur + "</em></td></tr>"
            );  
        });
        $('#grid').html(customers);
    });
    //////////////////////////////////////////////////////////////////////////////

    //Disabled//////////////////get the List of available accounts and fill it in the Balance Inquiry view ///////////////////////
    $.getJSON("data/newCustomerData.json", function(data) {
        var bankAccounts = [];
                 
        $.each(data.accounts, function(key, val) {
            var $accountInfo = $(this).get(0);     
            var iban_st = $accountInfo.IBAN_BBAN.substring(0, 9);
            var iban_en = $accountInfo.IBAN_BBAN.substring(9);
               
            var type_toLower = ($accountInfo.type).toLowerCase();
            var len = type_toLower.length;
              
            var cur = ($accountInfo.type).substr(len - 4);
            var type_Cap_first = type_toLower.substr(0, 1).toUpperCase() + type_toLower.substr(1, len - 4) + cur;
               
            var curBalance = $accountInfo.currentBalance;
            var avaBalance = $accountInfo.availableBalance;
               
            var currentBalanceFormated = numeral(curBalance).format('0,0.00');
            var availableBalanceFormated = numeral(avaBalance).format('0,0.00');
               
            //  bankAccounts.push("<li><a data-icon='details' id='"+$accountInfo.accountNumber+"'+ href='#moreAccountInfo'><strong>"+$accountInfo.accountNumber+"</strong></a></li>");
              
            bankAccounts.push("<li class='accountInfo'><a data-icon='details' id='" + $accountInfo.accountNumber + "'+ href='#moreAccountInfo'>" + "<strong>" + type_Cap_first + "</strong>" + "<br>" + $accountInfo.accountNumber + "<br><strong>Balance :</strong>" + $accountInfo.currentBalance + "</a></li>");
            //<a data-icon="play" href="#moreAccountInfo">Pay a friend</a>
        });
        // $('#balanceInquiryTable').html(bankAccounts);
    });
    //////////////////////////////////////////////////////////////////////////////
    
    //////// fill the friends list with dummy data ////////////////
    var listItems = "";
    for (var i = 0; i < accountBalance2.Balances.length; i++) {
        listItems+= "<option> " + accountBalance2.Balances[i].id[1] + "</option>";
    }
    $("#accountsList").html(listItems);
    
    var blancesListContainer = "<ul data-role='listview' data-style='inset'>";
    
    for (var i = 0;i < accountBalance2.Balances.length;i++) {
        blancesListContainer+= "<li><a data-icon='action' href='#'>" + accountBalance2.Balances[i].id[1] + "</a></li>";
    }
    blancesListContainer+="</ul>";
    //////// fill the firends list end /////////////////////////

    /////////////////////// get the current date //////////////////////
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy;
       
    $(currentDate).html(today);
    $(this).click(function(event) {
        var curAccount = event.target.id;
   /////////////////////// get the current date end //////////////////////     
         
       
    });
    
    
    
    
    
    
    
})
