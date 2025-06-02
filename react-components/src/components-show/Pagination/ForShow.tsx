import Pagination from './Pagination'

const data2 = Array.from({ length: 111 }, (_, idx) => {
  return {
    id: idx,
    first_name: 'firstName_' + idx,
    last_name: 'lastName_' + idx,
    email: 'email' + idx,
    phone: 'phone_' + idx,
  }
})

const Show = () => {
  return (
    <Pagination
      data={data2}
      pageSize={5}
      colNames={['ID', 'FIRST NAME', 'LAST NAME', 'EMAIL', 'PHONE']}
    ></Pagination>
  )
}

export default Show
