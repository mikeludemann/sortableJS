var sortable = (function(){
    
    var sortASC = function(mainElement, subElement, sortingElement, clickElement){

        $(clickElement).click(function (e) {

            e = e || event;

            e.preventDefault();
            
            var ascElements = $(subElement).sort(function (a, b) {

                return $(a).find(sortingElement).text() > $(b).find(sortingElement).text();

            });

            $(mainElement).html(ascElements);

        });

    }
    
    var sortDESC = function(mainElement, subElement, sortingElement, clickElement){

        $(clickElement).click(function (e) {

            e = e || event;

            e.preventDefault();

            var descElements = $(subElement).sort(function (a, b) {

                return $(a).find(sortingElement).text() < $(b).find(sortingElement).text();

            });

            $(mainElement).html(descElements);

        });

    }

    var convertStringToNumber = function(value){
        
        // Value after commata with commata
        var commaWithValue = value.substr(-3,3);
        
        // Only the commata char
        var commaOnly = value.substr(-3,1);
        
        // Replace commata to point
        var commaToPoint = commaWithValue.replace(",",".");
        
        // The value before commata char
        var valueForComma = value.replace(commaWithValue,"");
        
        // Convert any thousand format from currency to a valid number
        var valueToNumber = valueForComma.replace(/(\,|\.)/g,"");
        
        // Get the complete valid number
        var completeNumber = valueToNumber + "" + commaToPoint;
        
        // Return the complete Number
        return completeNumber;
            
    }
        
    var sortToggle = function(mainElement, subElement, sortingElement, clickElement){
    
        var ascending = false;
        
        $(clickElement).click(function (e) {

            e = e || event;

            e.preventDefault();

            var elements = $(subElement);

            var sortingElements = $(subElement).sort(function (a, b) {

                if(/\d/.test($(a).find(sortingElement).html())){
                    
                    if(ascending){

                        return (ascending == (convertStringToNumber($(a).find(sortingElement).html()) < convertStringToNumber($(b).find(sortingElement).html()))) ? 1 : -1;
                    
                    } else {
                        
                        return (ascending == (convertStringToNumber($(a).find(sortingElement).html()) > convertStringToNumber($(b).find(sortingElement).html()))) ? -1 : 1;
                    
                    }

                } else {

                    if(ascending){

                        return (ascending == ($(a).find(sortingElement).html() < $(b).find(sortingElement).html())) ? -1 : 1;
                    
                    } else {

                        return (ascending == ($(a).find(sortingElement).html() > $(b).find(sortingElement).html())) ? 1 : -1;
                    
                    }

                }

            });

            ascending = ascending ? false : true;

            $(mainElement).html(sortingElements);	

        });
    
    }
    
    return {

        sortASC: sortASC,
        sortDESC: sortDESC,
        sortToggle: sortToggle

    }

})();