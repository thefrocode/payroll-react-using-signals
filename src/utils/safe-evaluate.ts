import * as math from "mathjs";
export default function safeEvaluate(expression: any, scope: any) {
    const definedSymbols = Object.keys(scope);
  
    // Replace undefined symbols in the expression with 0
    const modifiedExpression = expression.replace(
      /[a-zA-Z_][a-zA-Z0-9_]*/g,
      (symbol: any) => {
        if (!definedSymbols.includes(symbol)) {
          return "0";
        }
        return symbol;
      }
    );
  
    return math.evaluate(modifiedExpression, scope);
  }