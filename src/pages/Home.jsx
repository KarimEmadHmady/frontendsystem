const Home = () => {

  return (
    <>
<section className="first-sections-home py-10 sm:py-16 lg:py-24">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="max-w-xl mx-auto text-center">
      <p className="main-header-p text-sm font-semibold tracking-widest text-[#5f2476] uppercase">
        الابتكار أولًا
      </p>
      <h2 className="mt-6 text-2xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
        نصنع الحلول الرقمية لمستقبل أكثر ذكاءً
      </h2>
    </div>
    
    <div className="grid items-center grid-cols-1 mt-12 gap-y-10 lg:grid-cols-5 sm:mt-20 gap-x-4">
      <div className="space-y-8 lg:pr-16 xl:pr-24 lg:col-span-2 lg:space-y-12">
        <div className="flex items-start">
          <svg className="flex-shrink-0 text-green-500 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          <div className="mr-5">
            <h3 className="text-xl font-semibold text-white">تطوير برمجيات متكاملة</h3>
            <p className="mt-3 text-base text-gray-300">نبتكر حلولًا برمجية مخصصة تلبي احتياجات أعمالك بكفاءة.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <svg className="flex-shrink-0 text-blue-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <div className="mr-5">
            <h3 className="text-xl font-semibold text-white">أمان وسرعة</h3>
            <p className="mt-3 text-base text-gray-300">نضمن أمان بياناتك وتقديم تجربة مستخدم سلسة وسريعة.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <svg className="flex-shrink-0 text-[#5f2476] w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <div className="mr-5">
            <h3 className="text-xl font-semibold text-white">دعم فني متواصل</h3>
            <p className="mt-3 text-base text-gray-300">فريقنا مستعد دائمًا لدعمك وحل أي مشكلات تقنية تواجهك.</p>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-3">
        <img className="w-full rounded-lg shadow-xl" src="../public/software-solutions.png" alt="" />
      </div>
    </div>
  </div>
</section>


      <section className="sections-contact">
        <div className="container px-6 py-12 mx-auto">
          <div className="text-center">
          <p className="font-medium text-blue-500 dark:text-blue-400">
            تواصل معنا
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
            يسعدنا سماعك
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            تحدث مع فريقنا الودود.
          </p>

          </div>

          <img
            className="object-cover w-full h-64 mt-10 rounded-lg lg:h-96"
            src="https://cdn.sanity.io/images/z7wg6mcy/production/67b53593e8c1c8bc728deab50137b6180cc04e0c-2448x1658.png?fm=png&q=100&fit=max&auto=format"
            alt="img"
          />

          <div className=" div-section-contact grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2 sm:grid-cols-2">
            <div className="p-4 rounded-lg bg-black">
              <span className="inline-block p-3  rounded-lg bg-[#5f2476]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-[#fff] "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                  
                </svg>
              </span>
              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                تحدث مع فريق المبيعات
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                تواصل مع فريقنا الودود.
              </p>
              <p className="mt-2 text-sm text-[#5f2476]">info@TurboTech.com</p>

            </div>


            <div className="p-4 rounded-lg bg-black md:p-6 ">
              <span className="inline-block p-3  rounded-lg bg-[#5f2476]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-[#fff]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>
              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
                اتصل بنا
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                من الإثنين إلى الجمعة، من الساعة 8 صباحًا حتى 5 مساءً.
              </p>
              <p className="mt-2 text-sm text-[#5f2476]">+201155993133</p>

            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4 flex justify-center items-center flex-col">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
          ستكون في رفقة مميزة </h2>
          <img src="/imageicone.png" alt="" />
        </div>
      </section>
    </>
  );
};

export default Home;
