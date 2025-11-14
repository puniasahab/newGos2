import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header';
import Footer from '../../components/footer';

const TermsAndConditions: React.FC = () => {
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
                    {t('terms.title')}
                </h1>
            </div>

            {/* Content */}
            <div style={{ 
                padding: '20px',
                paddingBottom: '100px'
            }}>
                {/* Section 1: Introduction */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('terms.section1.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('terms.section1.content')}
                    </p>
                </div>

                {/* Section 2: User Eligibility & Registration */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('terms.section2.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('terms.section2.content')}
                    </p>
                </div>

                {/* Section 3: Responsible Gaming & Fair Play */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('terms.section3.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('terms.section3.content')}
                    </p>
                </div>

                {/* Section 4: Liability & Disclaimers */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('terms.section4.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('terms.section4.content')}
                    </p>
                </div>

                {/* Section 5: Governing Law & Dispute Resolution */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('terms.section5.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('terms.section5.content')}
                    </p>
                </div>

                {/* Section 6: Amendments & Modifications */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('terms.section6.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('terms.section6.content')}
                    </p>
                </div>

                {/* Section 7: Contact Information */}
                <div style={sectionStyle}>
                    <h2 style={titleStyle}>
                        {t('terms.section7.title')}
                    </h2>
                    <p style={contentStyle}>
                        {t('terms.section7.content')}
                    </p>
                    <div style={companyInfoStyle}>
                        <p style={{
                            color: 'var(--primary-color)',
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            margin: 0
                        }}>
                            {t('terms.section7.companyName')}
                        </p>
                        <p style={{
                            color: '#e0e0e0',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            marginBottom: '8px',
                            margin: '8px 0'
                        }}>
                            {t('terms.section7.address')}
                        </p>
                        <p style={{
                            color: '#e0e0e0',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            margin: '8px 0 0 0'
                        }}>
                            {t('terms.section7.email')}
                        </p>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
