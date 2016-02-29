const fields = {
  wine: [
    { name: 'id', display: true },
    { name: 'name', display: true },
    { name: 'designation', display: true },
    { name: 'vintage', display: true },
    { name: 'ready_to_drink', display: true },
    { name: 'color', display: true },
    { name: 'notes', display: false },
    { name: 'created_at', display: false },
    { name: 'updated_at', display: false },
  ],

  bottle: [
    { name: 'id', display: true },
    { name: 'name', display: true, nesting: 'wine' },
    { name: 'designation', display: true, nesting: 'wine' },
    { name: 'vintage', display: true, nesting: 'wine' },
    { name: 'ready_to_drink', display: true, nesting: 'wine' },
    { name: 'color', display: true, nesting: 'wine' },
    { name: 'acquisition', display: true },
    { name: 'degustation', display: true },
    { name: 'notes', display: true, nesting: 'wine' },
    { name: 'row', display: false },
    { name: 'col', display: false },
    { name: 'notes', display: false },
    { name: 'created_at', display: false },
    { name: 'updated_at', display: false },
  ],
};

function getDisplayFields(type) {
  return fields[type].reduce((acc, field) => {
    if (!field.display) return acc;
    if (field.nesting) return acc.concat([`${field.nesting}.${field.name}`]);
    return acc.concat([field.name]);
  }, []);
}

function getFragmentFields(type) {
  return fields[type].map(field => field.name);
}

export const wineDisplayFields = getDisplayFields('wine');
export const wineFragment = `
  fragment wine on Wine {
    ${getFragmentFields('wine').join(', ')}
  }
`;

export const bottleDisplayFields = getDisplayFields('bottle');
export const bottleFragment = `
  fragment bottle on Bottle {
    ${getFragmentFields('bottle').join(', ')}
    wine {
      ${getFragmentFields('wine').join(', ')}
    }
  }
`;

export function read(obj, path) {
  const paths = path.split('.');
  return paths.reduce((o, p) => {
    if (o && o[p]) return o[p];
  }, obj);
}
