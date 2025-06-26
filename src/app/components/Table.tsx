import { Conjugations, QO, VerbEnding } from "../types/verbs";

const conjugations: Conjugations = {
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

function getVerbEnding(infinitive: string): VerbEnding {
  const ending = infinitive.slice(-2) as VerbEnding;

  if (ending === "ar" || ending === "er" || ending === "ir") {
    return ending;
  } else {
    throw new Error(`Invalid infinitive: ${infinitive}`);
  }
}

export const HintTable = (props: { questionObj: QO }) => {
  const { questionObj } = props;
  const { tense, infinitive } = questionObj;

  const verbEnding = getVerbEnding(infinitive);
  const term =
    verbEnding && tense ? conjugations[tense][verbEnding] : { message: "NA" };

  const styles = {
    padding: "5px",
    border: "1px solid black",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      <table data-testid="table" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles}>Pronoun</th>
            <th style={styles}>Conjugation</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(term).map(([pronoun, conjugation], index) => (
            <tr key={index}>
              <td style={styles}>{pronoun}</td>
              <td style={styles}>{conjugation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
