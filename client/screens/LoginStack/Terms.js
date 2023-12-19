import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

const Terms = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Vilkår og betingelser</Text>
        <Text style={styles.text}>
          1. Når du downloader og bruger Student Books, accepterer du vores
          vilkår og betingelser. Hvis du ikke kan lide dem, er du velkommen til
          at argumentere med din telefon, men vi garanterer ikke, at den vil
          lytte.
          {"\n\n"}
          2. Brugeren må ikke anvende appen til at sende spam eller andet
          uønsket indhold. Det gælder også kattevideoer. Selvom vi elsker katte,
          kan det blive for meget af det gode.
          {"\n\n"}
          3. Student Books forbeholder sig retten til at afbryde brugen af
          appen, hvis brugeren bryder disse vilkår og betingelser. Vi vil også
          afbryde brugen af appen, hvis vi simpelthen har en dårlig dag og
          trænger til at tage frustrationen ud på nogen.
        </Text>
        <Text style={styles.header}>Privatlivspolitik</Text>
        <Text style={styles.text}>
          1. Student Books indsamler personlige oplysninger for at forbedre
          brugeroplevelsen. Disse oplysninger vil blive opbevaret i et hemmeligt
          skab i bunden af et mørkt kælderrum, hvor ingen nogensinde vil finde
          det.
          {"\n\n"}
          2. Vi vil ikke dele dine personlige oplysninger med tredjepart,
          medmindre de giver os en rigtig god grund. Og nej, at give os en
          klapsalve tæller ikke som en god grund.
          {"\n\n"}
          3. Brugeren har ret til at anmode om indsigt i, hvilke
          personoplysninger vi har indsamlet, og har også ret til at bede os om
          at slette disse oplysninger. Men pas på, hvis du beder os om at slette
          dine oplysninger, vil vi også slette alle dine highscores og
          præstationer i appen. Vælg med omhu.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light_background,
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: COLORS.light_secondary,
  },
  text: {
    fontSize: 16,
    color: COLORS.light_primary,
    marginBottom: 10,
  },
});
