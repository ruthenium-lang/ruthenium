typedef struct qrt_expression_obj Expr;

struct qrt_expression_obj {
    String content;
    bool isLiteral;
};

Expr Expr_Lit(const String literal) {
    Expr expr;
    {
        expr.content = literal;
        expr.isLiteral = true;
    }
    return expr;
}

Expr Expr_noLit(const String content) {
    Expr expr;
    {
        expr.content = content;
        expr.isLiteral = true;
    }
    return expr;
}


