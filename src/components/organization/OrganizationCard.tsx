import {
  Building2,
  Phone,
  MapPin,
  Mail,
  Eye,
  Edit,
  Trash2,
  } from "lucide-react";
  interface orgParams{
  organizations:any[]
  }
  export const OrganizationCard = ({organizations}:orgParams) => {
  return (
  <div className="w-full gap-3 justify-center grid md:grid-col-2 lg:grid-cols-2  grid-cols-1  p-4 lg:px-8">
  {organizations.map((organization)=>(
  <div key={organization.id} className="relative group mb-3 ">
  <div
  className="w-[400px] h-[225px] rounded-xl shadow-2xl p-6 text-white relative overflow-hidden"
  style={{
  backgroundImage: `
  linear-gradient(to right, rgba(30, 58, 138, 0.95), rgba(30, 58, 138, 0.9)),
  url('https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?auto=format&fit=crop&w=800&q=80')
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
  }}
  >
  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
  <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors">
  <Eye className="w-4 h-4" />
  </button>
  <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors">
  <Edit className="w-4 h-4" />
  </button>
  <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-red-200 hover:text-red-100">
  <Trash2 className="w-4 h-4" />
  </button>
  </div>
  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/10 rounded-full -translate-y-16 translate-x-16 backdrop-blur-sm"></div>
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-700/10 rounded-full translate-y-16 -translate-x-16 backdrop-blur-sm"></div>
  <div className="flex items-center mb-4 relative z-10">
  <Building2 className="w-5 h-5 mr-2" />
  <h1 className="text-xl font-bold">{organization.name}</h1>
  </div>
  <div className="mb-6 relative z-10 pr-12">
  <h2 className="text-2xl font-bold">John Smith</h2>
  <p className="text-blue-100">Chief Executive Officer</p>
  </div>
  <div className="space-y-2 text-sm relative z-10 pr-12">
  <div className="flex items-center">
  <Phone className="w-4 h-4 mr-2" />
  <p>+1 (555) 123-4567</p>
  </div>
  <div className="flex items-center">
  <Mail className="w-4 h-4 mr-2" />
  <p>john.smith@acmecorp.com</p>
  </div>
  <div className="flex items-center">
  <MapPin className="w-4 h-4 mr-2" />
  <p>123 Business Street, New York, NY 10001</p>
  </div>
  </div>
  </div>
  
  </div>
  
  ))}
  
  </div>
  );
  }; 