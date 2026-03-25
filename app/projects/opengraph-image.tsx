import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Projects — Tamajit Modak';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        left: '15%',
                        width: '500px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'rgba(124, 106, 247, 0.06)',
                        filter: 'blur(100px)',
                    }}
                />

                <div
                    style={{
                        fontSize: '28px',
                        color: '#00ff88',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                    }}
                >
                    02 / Projects
                </div>

                <div
                    style={{
                        fontSize: '60px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #e4e4f0, #a899ff)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        lineHeight: 1.15,
                        textAlign: 'center',
                    }}
                >
                    Three things I actually built.
                </div>

                {/* Project names */}
                <div
                    style={{
                        display: 'flex',
                        gap: '24px',
                        marginTop: '32px',
                    }}
                >
                    {[
                        { name: 'ForgeOS', color: '#00ff88' },
                        { name: 'PathPilot', color: '#7c6af7' },
                        { name: 'Extracta', color: '#f7a06a' },
                    ].map((p) => (
                        <div
                            key={p.name}
                            style={{
                                fontSize: '20px',
                                color: p.color,
                                padding: '8px 20px',
                                borderRadius: '12px',
                                border: `1px solid ${p.color}40`,
                                letterSpacing: '0.1em',
                            }}
                        >
                            {p.name}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
