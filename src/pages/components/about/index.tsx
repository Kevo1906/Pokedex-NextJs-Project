import style from "./About.module.css"
export default function AboutComponent(){
    return (
        <div className={style.mainContainer}>
        <h1 className={style.h1}>About the developer:</h1>
        <div className={style.infoContainer}>
        <div className={style.cardContainer}>
            <img className={style.profileimg} src='/img/photo1675370435.jpg' alt="Me"></img>
            <div className={style.infoDiv}>
                <div className={style.nameDiv}>
                    <p className={style.name}>Kevin Padilla</p>
                    <p className={style.role}> FullStack Developer</p>
                </div>
                <div className={style.socialDiv}>
                <a href="https://github.com/Kevo1906" className={style.social_link1} target="_blank"><svg viewBox="0 0 496 512" className={style.socials}><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></a>
            
            
            <a href="https://www.linkedin.com/in/kevin-padilla-lopez-2a6b401b6/" className={style.social_link2} target="_blank"><svg viewBox="0 0 448 512" className={style.socials}><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a>

            <a href="https://wa.me/59160432644" className={style.social_link3} target="_blank"><svg viewBox="0 0 16 16" className={style.socials} xmlns="http://www.w3.org/2000/svg"> <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path> </svg></a>

            <a href="https://www.facebook.com/kevin.padillalopez" className={style.social_link4} target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={style.socials}><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
            </a>
                </div>
            </div>
        </div>
        <div className={style.aboutContainer}>
            <div className={style.aboutCard}>
                <div className={style.aboutContent}>
                    <p className={style.aboutName}>Kevin Padilla</p>
                    <div className={style.abouth6}>Fullstack Developer</div>
                    <a href="https://github.com/Kevo1906/Pokedex-NextJs-Project" className={style.btn_repo} target="_blank">Repository</a>
                    <div className={style.aboutHover_content}>
                        <p>Hey there! I'm a Fullstack Developer and Machine Learning Engineer. I'm all about tech and solving problems. I've got skills in HTML, CSS, JavaScript, Next JS, Tailwind JS, Prisma JS, React, Node.js, Express, Python, TensorFlow, and Django. My jam is creating cool and efficient web solutions that make life better for folks. I've got a solid background in computer science and machine learning, so I can bring some data science magic to real-world projects.</p>
                        <p>If you're up for teaming up on an awesome project or just wanna chat tech, don't hesitate to hit me up! You can also check out the tech stack I used in this project:</p>
                        <div className={style.tecnologies}>
                            <img src='/img/nextjs-icon.png' alt="" className={style.t_icon}/>
                            <img src='/img/prisma.212x256.png' alt="" className={style.t_icon}/>
                            <img src="/img/html.png" alt="" className={style.t_icon}/>
                            <img src="/img/javascript.png" alt="" className={style.t_icon}/>
                            <img src="/img/css.png" alt="" className={style.t_icon}/>
                            
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}