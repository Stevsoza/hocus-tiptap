import { Table, ActionIcon } from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";

export default function HomeView() {
  const handleDelete = (element: any) => {
    console.log(element.name);
  };

  let elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon', createdAt: new Date() },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen', createdAt: new Date() },
    { position: 8, mass: 15.999, symbol: 'O', name: 'Oxygen', createdAt: new Date() },
    { position: 9, mass: 18.998, symbol: 'F', name: 'Fluorine', createdAt: new Date() },
    { position: 10, mass: 20.180, symbol: 'Ne', name: 'Neon', createdAt: new Date() },
    { position: 11, mass: 22.990, symbol: 'Na', name: 'Sodium', createdAt: new Date() },
    { position: 12, mass: 24.305, symbol: 'Mg', name: 'Magnesium', createdAt: new Date() },
    { position: 13, mass: 26.982, symbol: 'Al', name: 'Aluminum', createdAt: new Date() },
    { position: 14, mass: 28.086, symbol: 'Si', name: 'Silicon', createdAt: new Date() },
    { position: 15, mass: 30.974, symbol: 'P', name: 'Phosphorus', createdAt: new Date() },
    { position: 16, mass: 32.065, symbol: 'S', name: 'Sulfur', createdAt: new Date() },
    { position: 17, mass: 35.453, symbol: 'Cl', name: 'Chlorine', createdAt: new Date() },
    { position: 18, mass: 39.948, symbol: 'Ar', name: 'Argon', createdAt: new Date() },
    { position: 19, mass: 39.098, symbol: 'K', name: 'Potassium', createdAt: new Date() },
    { position: 20, mass: 40.078, symbol: 'Ca', name: 'Calcium', createdAt: new Date() },
    { position: 21, mass: 44.956, symbol: 'Sc', name: 'Scandium', createdAt: new Date() },
    { position: 22, mass: 47.867, symbol: 'Ti', name: 'Titanium', createdAt: new Date() },
    { position: 23, mass: 50.942, symbol: 'V', name: 'Vanadium', createdAt: new Date() },
    { position: 24, mass: 51.996, symbol: 'Cr', name: 'Chromium', createdAt: new Date() },
    { position: 25, mass: 54.938, symbol: 'Mn', name: 'Manganese', createdAt: new Date() },
    { position: 26, mass: 55.845, symbol: 'Fe', name: 'Iron', createdAt: new Date() },
    { position: 27, mass: 58.933, symbol: 'Co', name: 'Cobalt', createdAt: new Date() },
    { position: 28, mass: 58.693, symbol: 'Ni', name: 'Nickel', createdAt: new Date() },
    { position: 29, mass: 63.546, symbol: 'Cu', name: 'Copper', createdAt: new Date() },
    { position: 30, mass: 65.38, symbol: 'Zn', name: 'Zinc', createdAt: new Date() },
    { position: 31, mass: 69.723, symbol: 'Ga', name: 'Gallium', createdAt: new Date() },
    { position: 32, mass: 72.630, symbol: 'Ge', name: 'Germanium', createdAt: new Date() },
    { position: 33, mass: 74.922, symbol: 'As', name: 'Arsenic', createdAt: new Date() },
    { position: 34, mass: 78.971, symbol: 'Se', name: 'Selenium', createdAt: new Date() },
    { position: 35, mass: 79.904, symbol: 'Br', name: 'Bromine', createdAt: new Date() },
    { position: 36, mass: 83.798, symbol: 'Kr', name: 'Krypton', createdAt: new Date() },
    { position: 37, mass: 85.468, symbol: 'Rb', name: 'Rubidium', createdAt: new Date() },
    { position: 38, mass: 87.62, symbol: 'Sr', name: 'Strontium', createdAt: new Date() },
  ]
  elements = elements.map((element) => ({ ...element, createdAt: new Date() }));

  const handleCreate = async() => {
    const data = await getDocs();
    console.log(data);
  };

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.createdAt.toLocaleString()}</Table.Td>
      <Table.Td><ActionIcon color="red" size={24} onClick={() => handleDelete(element)} ><IconTrashFilled size={16} /></ActionIcon></Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Document name</Table.Th>
          <Table.Th>Created at</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

const getDocs = async() => {
  try {
    const response = await fetch('/document/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Documento de prueba',
        content: 'Este es un documento de prueba',
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}