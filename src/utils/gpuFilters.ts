
export const filterOffers = (offers: any[], searchTerm: string) => {
  return offers.filter(offer => 
    offer.gpu_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.hostname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.datacenter?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const sortOffers = (offers: any[], sortBy: string) => {
  return offers.sort((a, b) => {
    switch (sortBy) {
      case "price":
        return (a.dph_total || 0) - (b.dph_total || 0);
      case "performance":
        return (b.reliability2 || 0) - (a.reliability2 || 0);
      case "availability":
        if (a.rentable && !b.rentable) return -1;
        if (!a.rentable && b.rentable) return 1;
        return 0;
      default:
        return 0;
    }
  });
};
