import * as React from 'react'

import './styles.scss'

import PaginatedTable from '../paginatedTable'

const staticData = {
  products: [
    {
      id: 4,
      category: 'Standing desk',
      name: 'Desk Go',
      price: 1100,
      stock: 5,
    },
  ],
  categories: [
    {
      id: 1,
      name: 'Accessories',
    },
    {
      id: 2,
      name: 'Ergonomic',
    },
    {
      id: 3,
      name: 'Standing desk',
    },
  ],
  users: [
    {
      id: 24,
      email: 'admin@4devs.com',
      name: 'The Admin',
      role: 'administrator',
    },
    {
      id: 32,
      email: 'user32@fake.com',
      name: 'Crazy user',
      role: 'user',
    },
  ],
  orders: [
    {
      id: 13,
      date: '22/07/2022 14:14:00',
      email: 'happy@client.com',
      name: 'A client',
      total: 2438,
    },
  ],
}

const AdminPanelDetails = ({ page }) => {
  return (
    <PaginatedTable
      cpanel={true}
      data={staticData[page.toLowerCase()]}
      dataName={page.toLowerCase()}
      title={page}
    />
  )
}

export default AdminPanelDetails
