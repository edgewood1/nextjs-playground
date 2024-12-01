const conjugations = {
  Present: {
    ar: {
      yo: "o",
      tú: "as",
      "él/ella/usted": "a",
      "nosotros/as": "amos",
      "vosotros/as": "áis",
      "ellos/as/ustedes": "an",
    },
    er: {
      yo: "o",
      tú: "es",
      "él/ella/usted": "e",
      "nosotros/as": "emos",
      "vosotros/as": "éis",
      "ellos/as/ustedes": "en",
    },
    ir: {
      yo: "o",
      tú: "es",
      "él/ella/usted": "e",
      "nosotros/as": "imos",
      "vosotros/as": "ís",
      "ellos/as/ustedes": "en",
    },
  },
  Preterite: {
    ar: {
      yo: "é",
      tú: "aste",
      "él/ella/usted": "ó",
      "nosotros/as": "amos",
      "vosotros/as": "asteis",
      "ellos/as/ustedes": "aron",
    },
    er: {
      yo: "í",
      tú: "iste",
      "él/ella/usted": "ió",
      "nosotros/as": "imos",
      "vosotros/as": "isteis",
      "ellos/as/ustedes": "ieron",
    },
    ir: {
      yo: "í",
      tú: "iste",
      "él/ella/usted": "ió",
      "nosotros/as": "imos",
      "vosotros/as": "isteis",
      "ellos/as/ustedes": "ieron",
    },
  },
  Imperfect: {
    ar: {
      yo: "aba",
      tú: "abas",
      "él/ella/usted": "aba",
      "nosotros/as": "ábamos",
      "vosotros/as": "abais",
      "ellos/as/ustedes": "aban",
    },
    er: {
      yo: "ía",
      tú: "ías",
      "él/ella/usted": "ía",
      "nosotros/as": "íamos",
      "vosotros/as": "íais",
      "ellos/as/ustedes": "ían",
    },
    ir: {
      yo: "ía",
      tú: "ías",
      "él/ella/usted": "ía",
      "nosotros/as": "íamos",
      "vosotros/as": "íais",
      "ellos/as/ustedes": "ían",
    },
  },
};

export const HintTable = (props) => {
  const { questionObj } = props;
  const { answer, question, tense, nextQuestion, infinitive } = questionObj;
  console.log("tense", tense);
  console.log("infinitive", infinitive);
  const term = conjugations[tense][infinitive];
  const styles = { border: "1px solid black", padding: "8px" };

  return (
    <table
      data-testid="table"
      style={{
        marginTop: "62vh",
        display: "flex",
        justifyContent: "center",
        color: 'black'
      }}
    >
      <thead>
        {/* <tr>
            <th>Pronoun</th>
            <th>Conjugation</th>
          </tr> */}
      </thead>
      <tbody>
        {Object.entries(term).map(([pronoun, conjugation]) => (
          <tr key={pronoun}>
            <td style={styles}>{pronoun}</td>
            <td style={styles}>{conjugation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
