// Script to write a given number in French

const ONE = 'un';
const TWO = 'deux';
const THREE = 'trois';
const FOUR = 'quatre';
const FIVE = 'cinq';
const SIX = 'six';
const SEVEN = 'sept';
const EIGHT = 'huit';
const NINE = 'neuf';
const TEN = 'dix';
const ELEVEN = 'onze';
const TWELVE = 'douze';
const THIRTEEN = 'treize';
const FOURTEEN = 'quatorze';
const FIFTEEN = 'quinze';
const SIXTEEN = 'seize';
const TWENTY = 'vingt';
const THIRTY = 'trente';
const FOURTY = 'quarante';
const FIFTY = 'cinquente';
const SIXTY = 'soixante';


var numbersMap = new Map();
numbersMap.set('1',ONE);
numbersMap.set('2',TWO);
numbersMap.set('3',THREE);
numbersMap.set('4',FOUR);
numbersMap.set('5',FIVE);
numbersMap.set('6',SIX);
numbersMap.set('7',SEVEN);
numbersMap.set('8',EIGHT);
numbersMap.set('9',NINE);
numbersMap.set('10',TEN);
numbersMap.set('11',ELEVEN);
numbersMap.set('12',TWELVE);
numbersMap.set('13',THIRTEEN);
numbersMap.set('14',FOURTEEN);
numbersMap.set('15',FIFTEEN);
numbersMap.set('16',SIXTEEN);
numbersMap.set('20',TWENTY);
numbersMap.set('30',THIRTY);
numbersMap.set('40',FOURTY);
numbersMap.set('50',FIFTY);
numbersMap.set('60',SIXTY);

function inputChange() // function to handle change event in the input
{
    var input = document.getElementById('myinput').value;
    // cleaning spaces
    input = input.trim();
    input = input.replace(/\s/g, '');

    var res = '';
    if(input.includes(',')) // if number has a comma, separate it and handle each part alone
    {
        var tmp = input.split(',');
        var preCommaInput = tmp[0];
        var postCommaInput = tmp[1]; // zeros in the end are trimmed
        for(var i = postCommaInput.length-1; i > 0 ; i--)
        {
            if(postCommaInput[i] != '0')
            {
                postCommaInput = postCommaInput.substring(0,i+1);
                break;
            }
        }
        res = process(preCommaInput);
        res += ' [virgule] ' + process(postCommaInput);
    }
    else
    {
        res = process(input);
    }

    console.log('result : ' + res);
    document.getElementById('result').innerHTML= res;
}

function process(input)
{
    console.log('input value : ' + input);
    var prefix = '';
    for (var i = 0 ; i < 16 - input.length ; i ++)
    {
        prefix += '0';
    }
    input = prefix + input;
//          input = input.split("").reverse().join("");
    console.log('input: ' + input);
    var tensUnits = input.substring(input.length-2,input.length);
    var hundreds = input.charAt(input.length-3);
    var thousands = input.substring(input.length - 6, input.length-3);
    var millions= input.substring(input.length - 9, input.length-6);
    var billions= input.substring(input.length - 12, input.length-9);
    var trillions= input.substring(input.length - 15, input.length-12);
    console.log('thousands: ' + thousands + ' | hundreds : ' + hundreds + ' | tens : ' + tensUnits);

    var res = '';
    res += ' ' + processTrillions(trillions);
    res += ' ' + processBillions(billions);
    res += ' ' + processMillions(millions);
    res += ' ' + processThousands(thousands);
    res += ' ' + processHundreds(hundreds);
    res += ' ' + processTensAndUnits(tensUnits);
    res = res.trim();
    return res;
}

function processTensAndUnits(arg)
{
    var tens = '';
    var units = '';
    console.log('arg length : ' + arg.length);
    if(arg.length === 1)
    {
        tens = '0';
        units = arg.charAt(0);
    }
    else
    {
        var tens = arg.charAt(0);
        var units = arg.charAt(1);
    }
    console.log('arg = ' + arg + ' | tens = ' + tens + ' | units = ' + units);
    var ret = '';
    if(tens == '0')
    {
        switch(units)
        {  
            case '1': ret = ONE; break;
            case '2': ret = TWO; break;
            case '3': ret = THREE; break;
            case '4': ret = FOUR; break;
            case '5': ret = FIVE; break;
            case '6': ret = SIX; break;
            case '7': ret = SEVEN; break;
            case '8': ret = EIGHT; break;
            case '9': ret = NINE; break;
        }
    }
    else if (tens === '1')
    {
        if (units === '7' || units === '8' || units === '9' || units === '0')
        {
            ret = TEN;
            if(units != '0')
                ret += '-' + numbersMap.get(units);
        }
        else
        {
            switch(units)
            {
                case '1' :
                    ret = ELEVEN;break;
                case '2' :
                    ret = TWELVE;break;
                case '3' :
                    ret = THIRTEEN;break;
                case '4' :
                    ret = FOURTEEN;break;
                case '5' :
                    ret = FIFTEEN;break;
                case '6' :
                    ret = SIXTEEN;break;
            }
        }
    }
    else
    {
        if(tens === '2' || tens === '3' || tens === '4' || tens === '5' || tens === '6')
        {
            ret += numbersMap.get(tens+'0');
            if (units === '1')
                ret += ' et ' + numbersMap.get('1') ;
            else if (units != '0')
                ret += ' ' + numbersMap.get(units);
        }
        else
        {
            if(tens == '7')
            {
                ret += 'soixante'
            }
            else if( tens === '8' || tens === '9')
            {
                ret += 'quatre-vingt';
            }
            if(units === '1')
                ret += ' et ';
            
            if(tens === '8')
                ret += ' ' + numbersMap.get(units);
            else
                ret += ' ' + processTensAndUnits('1' + units);
        }
    }
    return ret;
}


function processHundreds(arg)
{
    var ret = '';
    if(arg == '0')
        return ret;
    if(arg === '1')
        ret += ' cent';
    else
        ret += numbersMap.get(arg) + ' cents';
    return ret;
}

function processThousands(arg)
{
    var ret = '';
    if(arg === '000')
        return ret;
    if(arg === '001')
        ret += ' mille';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' milles';
    return ret;
}

function processMillions(arg)
{
    var ret = '';
    if(arg === '000')
        return ret;
    if(arg === '1')
        ret += ' un million';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' millions';
    return ret;
}

function processBillions(arg)
{
    var ret = '';
    if(arg === '000')
        return ret;
    if(arg === '1')
        ret += ' un billion';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' billions';
    return ret;
}

function processTrillions(arg)
{
    var ret = '';
    if(arg === '000')
        return ret;
    if(arg === '1')
        ret += ' un trillion';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' trillions';
    return ret;
}