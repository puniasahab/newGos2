import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header';
import Footer from '../../components/footer';

const PrivacyPolicy: React.FC = () => {
    const { t } = useTranslation();

    const sectionStyle = {
        marginBottom: '32px',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #333'
    };

    const titleStyle = {
        color: 'var(--primary-color)',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
        lineHeight: '1.4'
    };

    const contentStyle = {
        color: '#e0e0e0',
        fontSize: '14px',
        lineHeight: '1.6',
        marginBottom: '12px'
    };

    const bulletStyle = {
        color: '#c0c0c0',
        fontSize: '14px',
        lineHeight: '1.6',
        marginLeft: '20px',
        marginBottom: '8px',
        position: 'relative' as const
    };

    const companyInfoStyle = {
        backgroundColor: '#2a1810',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid var(--primary-color)',
        marginTop: '16px'
    };

    return (
        <div style={{ 
            backgroundColor: 'black', 
            minHeight: '100vh',
            color: 'white'
        }}>
            <Header />
            
            {/* Title */}
            <div style={{
                padding: '20px',
                borderBottom: '1px solid #333'
            }}>
                <h1 style={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: 0,
                    textAlign: 'center'
                }}>
                    {t('privacy.title')}
                </h1>
            </div>

            {/* Content */}
            <div style={{ 
                padding: '20px',
                paddingBottom: '100px'
            }}>
                {/* Introduction */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.introduction.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('privacy.introduction.content')}
                    </p>
                </div>

                {/* Section 1: Introduction */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section1.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('privacy.section1.content')}
                    </p>
                </div>

                {/* Section 2: Data Collection */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section2.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('privacy.section2.content1')}
                    </p>
                    <p style={contentStyle}>
                        {t('privacy.section2.content2')}
                    </p>
                    <p style={contentStyle}>
                        {t('privacy.section2.content3')}
                    </p>
                    <p style={contentStyle}>
                        {t('privacy.section2.content4')}
                    </p>
                </div>

                {/* Section 3: Purpose of Data Usage */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section3.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('privacy.section3.content1')}
                    </p>
                    <div style={bulletStyle}>
                        • {t('privacy.section3.bullet1')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section3.bullet2')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section3.bullet3')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section3.bullet4')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section3.bullet5')}
                    </div>
                </div>

                {/* Section 4: Data Sharing & Protection */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section4.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('privacy.section4.content1')}
                    </p>
                    <div style={bulletStyle}>
                        • {t('privacy.section4.bullet1')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section4.bullet2')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section4.bullet3')}
                    </div>
                    <p style={contentStyle}>
                        {t('privacy.section4.content2')}
                    </p>
                    <p style={contentStyle}>
                        {t('privacy.section4.content3')}
                    </p>
                </div>

                {/* Section 5: User Rights & Data Access */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section5.title')}
                    </h2>
                    <p style={contentStyle}>
                        • {t('privacy.section5.content1')}
                    </p>
                    <p style={contentStyle}>
                        • {t('privacy.section5.content2')}
                    </p>
                    <p style={contentStyle}>
                        • {t('privacy.section5.content3')}
                    </p>
                    <p style={{...contentStyle, fontWeight: '500'}}>
                        5.2. {t('privacy.section5.content4')}
                    </p>
                </div>

                {/* Section 6: Cookies & Tracking Technologies */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section6.title')}
                    </h2>
                    <p style={contentStyle}>
                        6.1. {t('privacy.section6.content1')}
                    </p>
                    <div style={bulletStyle}>
                        • {t('privacy.section6.bullet1')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section6.bullet2')}
                    </div>
                    <div style={bulletStyle}>
                        • {t('privacy.section6.bullet3')}
                    </div>
                    <p style={{...contentStyle, marginTop: '16px', fontWeight: '500'}}>
                        6.2. {t('privacy.section6.content2')}
                    </p>
                </div>

                {/* Section 7: Data Retention Policy */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section7.title')}
                    </h2>
                    <p style={contentStyle}>
                        7.1. {t('privacy.section7.content1')}
                    </p>
                    <p style={contentStyle}>
                        7.2. {t('privacy.section7.content2')}
                    </p>
                    <p style={contentStyle}>
                        7.3. {t('privacy.section7.content3')}
                    </p>
                </div>

                {/* Section 8: Policy Updates & Notifications */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section8.title')}
                    </h2>
                    <p style={contentStyle}>
                        8.1. {t('privacy.section8.content1')}
                    </p>
                    <p style={contentStyle}>
                        8.2. {t('privacy.section8.content2')}
                    </p>
                    <p style={contentStyle}>
                        8.3. {t('privacy.section8.content3')}
                    </p>
                </div>

                {/* Section 9: Contact Information */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('privacy.section9.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('privacy.section9.content')}
                    </p>
                    <div style={companyInfoStyle}>
                        <p style={{
                            color: 'var(--primary-color)',
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            margin: 0
                        }}>
                            {t('privacy.section9.companyName')}
                        </p>
                        <p style={{
                            color: '#e0e0e0',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            marginBottom: '8px',
                            margin: '8px 0'
                        }}>
                            {t('privacy.section9.address')}
                        </p>
                        <p style={{
                            color: '#e0e0e0',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            margin: '8px 0 0 0'
                        }}>
                            {t('privacy.section9.email')}
                        </p>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
