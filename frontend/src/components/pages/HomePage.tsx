import SearchSection from '../HomePage/SearchSection';

const HomePage = () => {
  return (
    <section>
      <div className='text-center my-4'>
        <h1 className='text-3xl font-bold'>
          Welcome to <span className='text-[#F9802D]'>FindFoods</span>
        </h1>
        <p>Search & order your desired food & enjoy your food</p>
      </div>
      <SearchSection />
    </section>
  );
};

export default HomePage;
