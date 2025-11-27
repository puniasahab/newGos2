'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
// import bannerContent from "../../assets/bannerContent.png"
import { Link } from 'react-router-dom';
import  { useTranslation } from 'react-i18next';
import inviteEnglish from "../../assets/inviteEnglish.jpg";
import inviteArabic from "../../assets/inviteArabic.jpg";
import invitePolish from "../../assets/invitePolish.jpg";

interface SwiperSliderProps {
    banners?: string[];
    loading?: boolean;
    LinkToLogin?: boolean; // If true, wraps each banner in a Link to the login page
}
export default function SwiperSlider({ LinkToLogin = true }: SwiperSliderProps) {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const getBannerBasedOnLanguage = () => {
        switch (currentLanguage) {
            case 'ar':
                return inviteArabic; // Replace with Arabic banner path
            case 'pl':
                return invitePolish; // Replace with Polish banner path
            case 'en':
                return inviteEnglish
            default:
                return inviteEnglish; // Replace with English banner path
        }
    }

    const bannerImage = getBannerBasedOnLanguage();
    const imagesToShow = [bannerImage, bannerImage, bannerImage];
    // const { crouselImages } = useAppSelector((state) => state.homePage);
    // const defaultBanners = ['/jackpot_img.png', '/winPizes_img.png', '/bigWins_img.png'];
    // const imagesToShow = crouselImages.length ? crouselImages : defaultBanners;
    // console.log('first crousel image url:', getImageUrl(imagesToShow[0]));
    return (
        <section className="bg-[linear-gradient(to_right,#ef4444,#7c3aed)] hm_slider_wrapper rounded-b-[20px]">
            <div className="px-4 gradiant_bg hm_slider rounded-b-[20px]">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    initialSlide={0}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    className="homeSlider bg-transparent"
                    key={imagesToShow.length}
                >
                    {imagesToShow.map((src, idx) => (

                        <SwiperSlide className='bg-transparent' key={idx}>
                            <div className="overflow-hidden flex items-center pb-5 rounded-b-[20px] !important" style={{cursor: 'pointer'}}>
                                {LinkToLogin ? (
                                    <Link to="/login" className='items-center w-full'>
                                        {
                                            <img
                                                src={src}
                                                alt={`banner-${idx}`}
                                                width={"100%"}
                                                height={200}
                                                className="w-full h-[180px] object-contain rounded-b-[20px]"
                                                style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
                                            />}
                                    </Link>
                                ) : (
                                    <img
                                        src={inviteEnglish}
                                        alt={`banner-${idx}`}
                                        width={500}
                                        height={200}
                                        className="w-full h-[180px] object-contain rounded-b-[20px]"
                                        style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
                                    />
                                )}
                            </div>
                        </SwiperSlide>


                    ))}
                </Swiper>

                <style>{`
          .swiper-pagination-bullets {
            bottom: -4px !important;
          }
          .swiper-pagination-bullet {
            background: #fff;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: #000;
          }
        `}</style>
            </div>
        </section>
    );
}
