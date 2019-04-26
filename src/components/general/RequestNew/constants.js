export const operations = {
  name: 'operation',
  label: 'Операция',
  items: [
    {
      value: 'sell',
      name: 'продажа',
    },
    {
      value: 'buy',
      name: 'покупка',
    },
  ],
};

export const objects = {
  name: 'object',
  label: 'Обьект',
  items: [
    {
      value: 'flat',
      name: 'квартира',
    },
    {
      value: 'house',
      name: 'дом',
    },
    {
      value: 'land',
      name: 'земля',
    },
  ],
};

export const buyFlatForm = {
  description: {
    parametrs: [
      'roomFrom', 'roomTo', 'maxFloorFrom', 'maxFloorTo', 'totalFrom', 'totalTo',
      'kitchenFrom', 'kitchenTo', 'floorFrom', 'floorTo', 'conditions', 'priceFrom',
      'priceTo', 'isLastFloor',
    ],
  },
  photos: [],
  additional: [
    'heatingIds', 'bathroomsIds', 'planIds', 'viewIds', 'overlappingIds', 'wallIds',
    'isCorners', 'roofIds', 'isTechnicalFloors', 'parkingIds', 'ceilingHeightIds', 'isGases',
  ],
};

export const commonForm = {
  description: [
    'streetId', 'house', /* 'apartment', 'housing' */
    'areaId', 'cityId', 'adminAreaId', /* 'microdistrictId', */
    'schemeId', 'complex', 'room', 'floor', 'maxFloor',
    'conditionId', 'wallFlatId', 'totalSquare', 'livingSquare', 'kitchenSquare',
    'description', 'status', 'price',
  ],
  photos: {
    tags: ['HOUSE', 'MAP', 'PLAN'],
    videos: [],
  },
  additional: [
    'heatingId', 'bathroomsId', 'planId', 'viewIds', 'equipmentIds', 'overlappingId',
    'isCorner', 'roofId', 'parkingIds', 'ceilingHeightId', 'isGas', 'isTechnicalFloor',
    'recreationIds',
  ],
};
