 $.getJSON("data/newCustomerData.json", function(data) {
            var moreAccountInfo = [];
                 
            $.each(data.accounts, function(key, val) {
                var $accountInfo = $(this).get(0);     
                if ($accountInfo.accountNumber===curAccount) {
                    //add content here 
                    moreAccountInfo.push("<li><strong>Account Number: </strong><br>" + $accountInfo.accountNumber + "</li>" +
                                         "<li><strong>IBAN_BBAN :</strong>" + $accountInfo.IBAN_BBAN + "</li>" +
                                         "<li><strong>Type: </strong>" + $accountInfo.type + "</li>" +
                                         "<li><strong>Available Balance :</strong>" + $accountInfo.availableBalance + "</li>" +
                                         "<li><strong>Current Balance : </strong>" + $accountInfo.currentBalance + "</li>" +
                                         "<li><strong>Currancy :</strong>" + $accountInfo.currency + "</li>");
                }
                //$("#moreInfoDiv").html(moreAccountInfo);  
            });
            //$('#balanceInquiryTable').html(bankAccounts);
        });








