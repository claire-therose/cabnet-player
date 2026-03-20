import appLogo from 'assets/icons/icon.png';

export default function TitlebarLogo () {
  return (
    <>
      <section className='window-titlebar-icon'>
        <img src={appLogo} alt='App logo' />
      </section>
      <section className='font-title'>Cabnet Player</section>
    </>
  );
}
