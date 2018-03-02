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


let numbersMap = new Map();
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

const NUMBER_MAX_LENGTH = 20; // maximum length of the number


const convert = (input) => // Main function which is the entry point fo the module
{

    // cleaning spaces
    input = cleanInput(input.toString());


    if ( input < 0 )
    {
        return false;
    }

    let res = '';
    if(input.includes(',')) // if number has a comma, separate it and handle each part alone
    {
        let tmp = input.split(',');
        let preCommaInput = tmp[0];
        let postCommaInput = tmp[1];
        // zeros in the end are trimmed
        for(let i = postCommaInput.length-1; i > 0 ; i--)
        {
            if(postCommaInput[i] != '0')
            {
                postCommaInput = postCommaInput.substring(0,i+1);
                break;
            }
        }
        // zeros in the beginning are taken into account
        let zeros = '';
        for (let i = 0 ; i < postCommaInput ; i++)
        {
            if(postCommaInput[i] == '0')
                zeros += 'zero ';
            else
                break;
        }
        res = process(preCommaInput);
        res += ' virgule ' + zeros + process(postCommaInput);
    }
    else
    {
        res = process(input);
    }

//  console.log('result : ' + res);
    return res;
};

const cleanInput = (arg) => // Checks and cleans the inputed value that is supposed to be converted to words
{
    arg = arg.trim();
    arg = arg.replace(/\s/g, '');
    arg = arg.replace(/\./g, ',')
    if ( arg.length > NUMBER_MAX_LENGTH )
        return -1;
    else
        return arg;
};


const process = (input) => // main function that will start the conversion
{

    let prefix = '';
    for (let i = 0 ; i < NUMBER_MAX_LENGTH - input.length ; i ++)
    {
        prefix += '0';
    }
    input = prefix + input;


    let tensUnits = input.substring(input.length-2,input.length);

    let hundreds = input.charAt(input.length-3);
    let thousands = input.substring(input.length - 6, input.length-3);
    let millions= input.substring(input.length - 9, input.length-6);
    let milliards= input.substring(input.length - 12, input.length-9);
    let billions= input.substring(input.length - 15, input.length-12);
    let trillions= input.substring(input.length - 18, input.length-15);

    let res = '';
    res += ' ' + processTrillions(trillions);
    res += ' ' + processBillions(billions);
    res += ' ' + processMilliards(milliards);
    res += ' ' + processMillions(millions);
    res += ' ' + processThousands(thousands);
    res += ' ' + processHundreds(hundreds);
    res += ' ' + processTensAndUnits(tensUnits);
    res = res.trim();
    return res;
};

const processTensAndUnits = (arg) =>
{
    let tens = '';
    let units = '';

    if(arg.length === 1)
    {
        tens = '0';
        units = arg.charAt(0);
    }
    else
    {
        tens = arg.charAt(0);
        units = arg.charAt(1);
    }

    let ret = '';
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
};

const processHundreds = (arg) =>
{
    let ret = '';
    if(arg == '0')
        return ret;
    if(arg === '1')
        ret += ' cent';
    else
        ret += numbersMap.get(arg) + ' cents';
    return ret;
};

const processThousands = (arg) =>
{
    let ret = '';
    if(arg === '000')
        return ret;
    if(arg === '001')
        ret += ' mille';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' milles';
    return ret;
};

const processMillions = (arg) =>
{
    let ret = '';
    if(arg === '000')
        return ret;
    if(arg === '001')
        ret += ' un million';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' millions';
    return ret;
};

const processMilliards = (arg) =>
{
    let ret = '';
    if(arg === '000')
        return ret;
    if(arg === '001')
        ret += ' un milliard';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' milliards';
    return ret;
};

const processBillions = (arg) =>
{
    let ret = '';
    if(arg === '000')
        return ret;
    if(arg === '001')
        ret += ' un billion';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' billions';
    return ret;
};

const processTrillions = (arg) =>
{
    let ret = '';
    if(arg === '000')
        return ret;
    if(arg === '001')
        ret += ' un trillion';
    else
        ret += processHundreds(arg.charAt(0)) + ' ' + processTensAndUnits(arg.substring(1,3)) + ' trillions';
    return ret;
};

module.exports = convert;
