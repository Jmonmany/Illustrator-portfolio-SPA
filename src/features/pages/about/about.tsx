import './about.scss';
export default function About() {
    return (
        <>
            <section className="about" role="article">
                <div>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/marina-labella-app.appspot.com/o/foto%20bio.webp?alt=media&token=51f79ed4-2785-4983-a38e-b456d301d135"
                        alt="Marina Labella"
                    />
                </div>
                <article>
                    <h3>About Me</h3>
                    <p>
                        <span>
                            Marina Labella is a Spanish illustrator from
                            Barcelona currently based in Germany.
                        </span>
                    </p>
                    <p>
                        <span>She's a biology graduate by the </span>
                        <span>
                            <a
                                href="https://www.ub.edu/web/portal/en/"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Universitat de Barcelona
                            </a>{' '}
                            and has a degree in Illustration by{' '}
                        </span>
                        <span>
                            <a
                                href="https://www.escolamassana.cat/en"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Escola Massana
                            </a>
                            , where she had the opportunity to spend an Erasmus
                            semester in{' '}
                        </span>
                        <span>
                            <a
                                href="https://www.haw-hamburg.de/studium/studiengaenge-a-z/studiengaenge-detail/course/courses/show/illustration/Studieninteressierte/"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                HAW Hamburg
                            </a>
                            . After finishing her studies, she decided to remain
                            in Hamburg where she currently works as a freelance
                            illustrator and animator.
                            <br />
                            Illustration is her passion and the visual
                            communication within it is the part that attracts
                            her the most. She considers illustration her
                            playground, where she keeps learning and discovering
                            everyday new ways to communicate and inspire.
                            <br />
                        </span>
                    </p>
                    <h4>Publications:</h4>
                    <ul>
                        <li>La Directa Magazine</li>
                        <li>Slanted Magazine</li>
                        <li>Feels Zine</li>
                        <li>Litherarische divers</li>
                        <li>Nos.altres</li>
                    </ul>
                    <h4>Group Exhibitions:</h4>
                    <ul>
                        <li>Babakamo, December 2021 - Valencia, Spain</li>
                        <li>
                            Cuerpos indomables, December 2021- Barcelona, Spain
                        </li>
                    </ul>
                    <h4>Work inquiries and commissions:</h4>
                    <span>
                        <a href="mailto:marinaf.labella@gmail.com">
                            marinaf.labella@gmail.com
                        </a>
                    </span>
                </article>
            </section>
        </>
    );
}
