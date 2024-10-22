import Link from 'next/link'
const Header =({CurrentUser})=>{

    console.log('in header',CurrentUser)
const links=[!CurrentUser && {label:'Sign In' , href:'/auth/signin'},
    !CurrentUser &&  {label:'Sign Up' , href:'/auth/signup'},
    CurrentUser &&  {label:'Sign Out' , href:'/auth/signout'}
].filter((linkConfig)=>linkConfig).map(({label,href})=><Link key={href} href={href}>{label}</Link>)
    return <nav>
  <Link href="/">
  Gitix
  </Link>
  <div className='flex flex-col justify-end'>

    <ul className='flex items-center'>
    {links}
    </ul>
  </div>
    </nav>
}
export default Header