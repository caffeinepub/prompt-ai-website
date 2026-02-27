import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import List "mo:core/List";

actor {
  type Exchange = {
    prompt : Text;
    response : Text;
  };

  let history = List.empty<Exchange>();

  public shared ({ caller }) func submitPrompt(prompt : Text) : async Text {
    if (prompt.size() > 500) {
      Runtime.trap("Prompt exceeded maximum length of 500 characters.");
    };
    let response = simulateAIResponse(prompt);
    history.add({
      prompt;
      response;
    });
    response;
  };

  func simulateAIResponse(_prompt : Text) : Text {
    "This is a simulated response.";
  };

  public query ({ caller }) func getHistory() : async [Exchange] {
    history.toArray();
  };

  public shared ({ caller }) func clearHistory() : async () {
    history.clear();
  };
};
