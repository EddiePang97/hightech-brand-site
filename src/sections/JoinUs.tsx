import React from 'react'

export default function PartnerSection() {
  return (
    <section
        id="joinus"
      className="w-full bg-cover bg-center text-center text-blue-900 px-4 py-24 relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/joinus.jpg')",
      }}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-0" />

      {/* 内容层 */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-12 animate-fadeIn">
        {/* 标题部分 */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest uppercase mb-3 drop-shadow-md">
            Partner With Excellence In Premium Entertainment
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            Elevate Your Business With A Leading Entertainment Brand
          </p>
          <p className="text-base md:text-lg font-light text-blue-700 mt-2">
            Why Partner With Us?
          </p>
        </div>

        {/* 内容条目 */}
        <div className="max-w-3xl mx-auto space-y-8 text-sm md:text-base text-left">
          {[
            {
              title: 'Established Brand & Market Leadership',
              desc: 'Leverage a well-recognized brand with a strong presence in the upscale entertainment industry.'
            },
            {
              title: 'Comprehensive Business Support',
              desc: 'Benefit from expert guidance in site selection, venue design, operations, and marketing strategies.'
            },
            {
              title: 'Exclusive Membership Ecosystem',
              desc: 'Access a high-value clientele through our integrated membership and loyalty programs.'
            },
            {
              title: 'Cutting-Edge Technology & Analytics',
              desc: 'Utilize state-of-the-art management systems and data-driven insights for optimized operations.'
            }
          ].map((item, i) => (
            <div key={i} className="transition duration-300 hover:scale-[1.01]">
              <p className="font-semibold text-blue-900 text-lg">{item.title}</p>
              <p className="text-blue-700 text-sm mt-1 opacity-90 leading-relaxed">
                ({item.desc})
              </p>
            </div>
          ))}
        </div>

        {/* CTA 按钮 */}
        <div className="pt-6">
          <button className="text-blue-800 text-lg font-semibold underline hover:opacity-80 transition duration-300">
            Join Us Now
          </button>
        </div>
      </div>
    </section>
  )
}