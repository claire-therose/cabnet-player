import cabnetLogoMain from 'assets/cabnet/cabnet_main_logo.svg';

export default function TitlebarLogo () {
  return (
    <>
      <section className='w-8 h-8 ml-1 p-1'>
        <img src={cabnetLogoMain} alt='App logo' />
      </section>
      <section className='ml-1 font-title font-semibold text-[16px]'>cabnet player</section>
    </>
  );
}
