typedef struct qrt_value_obj Value;

struct qrt_value_obj {
    Type type;
    Expr expr;
};

Value Value_new(Type type, Expr expr) {
    Value val;
    {
        val.type = type;
        val.expr = expr;
    }
    return val;
}

Value Value_ofExpr(Expr expr) {
    return Value_new("?", expr);
}
