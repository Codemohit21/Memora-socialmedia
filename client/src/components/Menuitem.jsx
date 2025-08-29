// import React from 'react'
// import { menuItemsData } from '../assets/assets.js'
// import { NavLink } from 'react-router-dom'

// const Menuitem = ({setSidebarOpen}) => {
    
//   return (
    
//     <div className='px-6 text-gray-600 space-y-1 font-medium'>
//         {
//             menuItemsData?.map(({to,label,Icon})=>(
//                 <NavLink key={to} to={to} end={to === '/'} onClick={() => setSidebarOpen(false)} className={({ isActive }) =>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${isActive?'bg-indigo-50 text-indigo-700':'hover:bg-gray-50'}`}>

//                     <Icon className='w-5 h-5' />
//                     {label}

//                 </NavLink>
//             ))
//         }
//     </div>
    

//   )
// }

// export default Menuitem
import React from 'react'
import { menuItemsData } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'

const Menuitem = ({ setSidebarOpen }) => {
  return (
    <div className="px-6 text-gray-800 space-y-2 font-medium">
      {menuItemsData?.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-xl 
             transition-all duration-500 ease-in-out transform
             ${
               isActive
                 ? "bg-gradient-to-r from-[#fdfcfb] via-[#f5ebe0] to-[#ede7f6] text-gray-900 font-semibold shadow-md scale-[1.02]"
                 : "hover:bg-gradient-to-r hover:from-[#fdfcfb] hover:via-[#f5ebe0] hover:to-[#ede7f6] text-gray-700 hover:shadow-lg hover:scale-[1.02]"
             }`
          }
        >
          <Icon className="w-5 h-5 transition-colors duration-500 ease-in-out" />
          <span className="transition-colors duration-500 ease-in-out">{label}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default Menuitem

