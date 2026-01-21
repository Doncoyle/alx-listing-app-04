import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query; 
  
  // Adding <any> fixes the red wavy line error on response.data
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; 

    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); 

  // You must include this return logic so the file isn't "empty"
  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div>
       <h1>{property.name}</h1>
       <p>{property.description}</p>
    </div>
  );
}