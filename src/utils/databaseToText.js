import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export function renderOperationContent(operation) {
  switch (operation) {
    case 'SELL':
      return 'Продать';
    case 'BUY':
      return 'Купить';
    default:
      return '';
  }
}
export function renderTypeContent(operation) {
  switch (operation) {
    case 'FLAT':
      return 'Квартира';
    case 'LAND':
      return 'Земля';
    case 'HOUSE':
      return 'Дом';
    default:
      return '';
  }
}

export function renderStatusContent(operation) {
  switch (operation) {
    case 'ON_SALE':
      return 'В продаже';
    case 'EXCLUSIVE':
      return 'Эксклюзив';
    case 'DELAYED':
      return 'Отложен';
    case 'DISCONTINUED':
      return 'Снят с продажи';
    default:
      return '';
  }
}

export function normalizeDate(date) {
  let newDate = moment(date);
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(date) && isFinite(date)) {
    newDate = moment.unix(date);
  }

  const returnDate = newDate.calendar(null, {
    sameDay: 'HH:mm',
    lastDay: '[Вчера]',
    lastWeek: 'D MMM',
    sameElse: 'D MMM',
  });

  return returnDate[returnDate.length - 1] === '.'
    ? returnDate.slice(0, returnDate.length - 1)
    : returnDate;
}

export function getAttributeNameById(id, attribute, isCapitalized) {
  const finalAttribute = attribute.find(
    attributeElem => attributeElem.id === id
  );

  return finalAttribute
    ? isCapitalized
      ? finalAttribute.name
      : finalAttribute.name.toLowerCase()
    : '';
}

export function toCurrencyFormat(number) {
  if (typeof number === 'number') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return number;
}
