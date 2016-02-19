export const wineFields = [
  'id',
  'name',
  'designation',
  'vintage',
  'ready_to_drink',
  'color',
  'notes'
];

export const wineFragment = `
  fragment wine on Wine {
    ${wineFields.join(', ')}
  }
`;

export const bottleFields = [
  'id',
  // { wine: wineFields },
  'row',
  'col',
  'acquisition',
  'degustation',
  'notes',
  'updated_at'
];

export const bottleFragment = `
  fragment bottle on Bottle {
    ${bottleFields.join(', ')}
    wine {
      ${wineFields.join(', ')}
    }
  }
`;
